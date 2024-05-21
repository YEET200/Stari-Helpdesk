const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Training_and_tutorialsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const training_and_tutorials = await db.training_and_tutorials.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        description: data.description || null,
        type: data.type || null,
        start_date: data.start_date || null,
        end_date: data.end_date || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return training_and_tutorials;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const training_and_tutorialsData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      description: item.description || null,
      type: item.type || null,
      start_date: item.start_date || null,
      end_date: item.end_date || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const training_and_tutorials = await db.training_and_tutorials.bulkCreate(
      training_and_tutorialsData,
      { transaction },
    );

    // For each item created, replace relation files

    return training_and_tutorials;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const training_and_tutorials = await db.training_and_tutorials.findByPk(
      id,
      {},
      { transaction },
    );

    await training_and_tutorials.update(
      {
        title: data.title || null,
        description: data.description || null,
        type: data.type || null,
        start_date: data.start_date || null,
        end_date: data.end_date || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return training_and_tutorials;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const training_and_tutorials = await db.training_and_tutorials.findByPk(
      id,
      options,
    );

    await training_and_tutorials.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await training_and_tutorials.destroy({
      transaction,
    });

    return training_and_tutorials;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const training_and_tutorials = await db.training_and_tutorials.findOne(
      { where },
      { transaction },
    );

    if (!training_and_tutorials) {
      return training_and_tutorials;
    }

    const output = training_and_tutorials.get({ plain: true });

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
    let include = [];

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
          [Op.and]: Utils.ilike(
            'training_and_tutorials',
            'title',
            filter.title,
          ),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'training_and_tutorials',
            'description',
            filter.description,
          ),
        };
      }

      if (filter.calendarStart && filter.calendarEnd) {
        where = {
          ...where,
          [Op.or]: [
            {
              start_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
            {
              end_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
          ],
        };
      }

      if (filter.start_dateRange) {
        const [start, end] = filter.start_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            start_date: {
              ...where.start_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            start_date: {
              ...where.start_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.end_dateRange) {
        const [start, end] = filter.end_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            end_date: {
              ...where.end_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            end_date: {
              ...where.end_date,
              [Op.lte]: end,
            },
          };
        }
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
          count: await db.training_and_tutorials.count({
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
      : await db.training_and_tutorials.findAndCountAll({
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
          Utils.ilike('training_and_tutorials', 'title', query),
        ],
      };
    }

    const records = await db.training_and_tutorials.findAll({
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
