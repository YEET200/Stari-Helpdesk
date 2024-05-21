const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Support_ticketsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const support_tickets = await db.support_tickets.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        description: data.description || null,
        status: data.status || null,
        comments: data.comments || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await support_tickets.setCustomer(data.customer || null, {
      transaction,
    });

    await support_tickets.setAssigned_agent(data.assigned_agent || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.support_tickets.getTableName(),
        belongsToColumn: 'Attachments',
        belongsToId: support_tickets.id,
      },
      data.Attachments,
      options,
    );

    return support_tickets;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const support_ticketsData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      description: item.description || null,
      status: item.status || null,
      comments: item.comments || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const support_tickets = await db.support_tickets.bulkCreate(
      support_ticketsData,
      { transaction },
    );

    // For each item created, replace relation files

    for (let i = 0; i < support_tickets.length; i++) {
      await FileDBApi.replaceRelationFiles(
        {
          belongsTo: db.support_tickets.getTableName(),
          belongsToColumn: 'Attachments',
          belongsToId: support_tickets[i].id,
        },
        data[i].Attachments,
        options,
      );
    }

    return support_tickets;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const support_tickets = await db.support_tickets.findByPk(
      id,
      {},
      { transaction },
    );

    await support_tickets.update(
      {
        title: data.title || null,
        description: data.description || null,
        status: data.status || null,
        comments: data.comments || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await support_tickets.setCustomer(data.customer || null, {
      transaction,
    });

    await support_tickets.setAssigned_agent(data.assigned_agent || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.support_tickets.getTableName(),
        belongsToColumn: 'Attachments',
        belongsToId: support_tickets.id,
      },
      data.Attachments,
      options,
    );

    return support_tickets;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const support_tickets = await db.support_tickets.findByPk(id, options);

    await support_tickets.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await support_tickets.destroy({
      transaction,
    });

    return support_tickets;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const support_tickets = await db.support_tickets.findOne(
      { where },
      { transaction },
    );

    if (!support_tickets) {
      return support_tickets;
    }

    const output = support_tickets.get({ plain: true });

    output.customer = await support_tickets.getCustomer({
      transaction,
    });

    output.assigned_agent = await support_tickets.getAssigned_agent({
      transaction,
    });

    output.Attachments = await support_tickets.getAttachments({
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

      {
        model: db.users,
        as: 'assigned_agent',
      },

      {
        model: db.file,
        as: 'Attachments',
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
          [Op.and]: Utils.ilike('support_tickets', 'title', filter.title),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'support_tickets',
            'description',
            filter.description,
          ),
        };
      }

      if (filter.comments) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('support_tickets', 'comments', filter.comments),
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

      if (filter.status) {
        where = {
          ...where,
          status: filter.status,
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

      if (filter.assigned_agent) {
        var listItems = filter.assigned_agent.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          assigned_agentId: { [Op.or]: listItems },
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
          count: await db.support_tickets.count({
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
      : await db.support_tickets.findAndCountAll({
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
          Utils.ilike('support_tickets', 'title', query),
        ],
      };
    }

    const records = await db.support_tickets.findAll({
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
