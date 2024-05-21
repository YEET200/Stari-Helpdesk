const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Feedback_and_surveysDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const feedback_and_surveys = await db.feedback_and_surveys.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        content: data.content || null,
        type: data.type || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await feedback_and_surveys.setCustomer(data.customer || null, {
      transaction,
    });

    return feedback_and_surveys;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const feedback_and_surveysData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      content: item.content || null,
      type: item.type || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const feedback_and_surveys = await db.feedback_and_surveys.bulkCreate(
      feedback_and_surveysData,
      { transaction },
    );

    // For each item created, replace relation files

    return feedback_and_surveys;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const feedback_and_surveys = await db.feedback_and_surveys.findByPk(
      id,
      {},
      { transaction },
    );

    await feedback_and_surveys.update(
      {
        title: data.title || null,
        content: data.content || null,
        type: data.type || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await feedback_and_surveys.setCustomer(data.customer || null, {
      transaction,
    });

    return feedback_and_surveys;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const feedback_and_surveys = await db.feedback_and_surveys.findByPk(
      id,
      options,
    );

    await feedback_and_surveys.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await feedback_and_surveys.destroy({
      transaction,
    });

    return feedback_and_surveys;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const feedback_and_surveys = await db.feedback_and_surveys.findOne(
      { where },
      { transaction },
    );

    if (!feedback_and_surveys) {
      return feedback_and_surveys;
    }

    const output = feedback_and_surveys.get({ plain: true });

    output.customer = await feedback_and_surveys.getCustomer({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'customer',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('feedback_and_surveys', 'title', filter.title),
        };
      }

      if (filter.content) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'feedback_and_surveys',
            'content',
            filter.content,
          ),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.type) {
        where = {
          ...where,
          type: filter.type,
        };
      }

      if (filter.customer) {
        var listItems = filter.customer.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          customerId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.feedback_and_surveys.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.feedback_and_surveys.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('feedback_and_surveys', 'title', query),
        ],
      };
    }

    const records = await db.feedback_and_surveys.findAll({
      attributes: ['id', 'title'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['title', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }
};
