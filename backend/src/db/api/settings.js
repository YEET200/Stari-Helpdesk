const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class SettingsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const settings = await db.settings.create(
      {
        id: data.id || undefined,

        Database_user: data.Database_user || null,
        Database_Password: data.Database_Password || null,
        Database_Port: data.Database_Port || null,
        Databose_Host: data.Databose_Host || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return settings;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const settingsData = data.map((item, index) => ({
      id: item.id || undefined,

      Database_user: item.Database_user || null,
      Database_Password: item.Database_Password || null,
      Database_Port: item.Database_Port || null,
      Databose_Host: item.Databose_Host || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const settings = await db.settings.bulkCreate(settingsData, {
      transaction,
    });

    // For each item created, replace relation files

    return settings;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const settings = await db.settings.findByPk(id, {}, { transaction });

    await settings.update(
      {
        Database_user: data.Database_user || null,
        Database_Password: data.Database_Password || null,
        Database_Port: data.Database_Port || null,
        Databose_Host: data.Databose_Host || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return settings;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const settings = await db.settings.findByPk(id, options);

    await settings.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await settings.destroy({
      transaction,
    });

    return settings;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const settings = await db.settings.findOne({ where }, { transaction });

    if (!settings) {
      return settings;
    }

    const output = settings.get({ plain: true });

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

      if (filter.Database_user) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'settings',
            'Database_user',
            filter.Database_user,
          ),
        };
      }

      if (filter.Database_Password) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'settings',
            'Database_Password',
            filter.Database_Password,
          ),
        };
      }

      if (filter.Database_Port) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'settings',
            'Database_Port',
            filter.Database_Port,
          ),
        };
      }

      if (filter.Databose_Host) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'settings',
            'Databose_Host',
            filter.Databose_Host,
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
          count: await db.settings.count({
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
      : await db.settings.findAndCountAll({
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
          Utils.ilike('settings', 'id', query),
        ],
      };
    }

    const records = await db.settings.findAll({
      attributes: ['id', 'id'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }
};
