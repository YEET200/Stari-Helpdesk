const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Knowledge_base_articlesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const knowledge_base_articles = await db.knowledge_base_articles.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        content: data.content || null,
        category: data.category || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await knowledge_base_articles.setAuthor(data.author || null, {
      transaction,
    });

    return knowledge_base_articles;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const knowledge_base_articlesData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      content: item.content || null,
      category: item.category || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const knowledge_base_articles = await db.knowledge_base_articles.bulkCreate(
      knowledge_base_articlesData,
      { transaction },
    );

    // For each item created, replace relation files

    return knowledge_base_articles;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const knowledge_base_articles = await db.knowledge_base_articles.findByPk(
      id,
      {},
      { transaction },
    );

    await knowledge_base_articles.update(
      {
        title: data.title || null,
        content: data.content || null,
        category: data.category || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await knowledge_base_articles.setAuthor(data.author || null, {
      transaction,
    });

    return knowledge_base_articles;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const knowledge_base_articles = await db.knowledge_base_articles.findByPk(
      id,
      options,
    );

    await knowledge_base_articles.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await knowledge_base_articles.destroy({
      transaction,
    });

    return knowledge_base_articles;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const knowledge_base_articles = await db.knowledge_base_articles.findOne(
      { where },
      { transaction },
    );

    if (!knowledge_base_articles) {
      return knowledge_base_articles;
    }

    const output = knowledge_base_articles.get({ plain: true });

    output.author = await knowledge_base_articles.getAuthor({
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
        as: 'author',
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
          [Op.and]: Utils.ilike(
            'knowledge_base_articles',
            'title',
            filter.title,
          ),
        };
      }

      if (filter.content) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'knowledge_base_articles',
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

      if (filter.category) {
        where = {
          ...where,
          category: filter.category,
        };
      }

      if (filter.author) {
        var listItems = filter.author.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          authorId: { [Op.or]: listItems },
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
          count: await db.knowledge_base_articles.count({
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
      : await db.knowledge_base_articles.findAndCountAll({
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
          Utils.ilike('knowledge_base_articles', 'title', query),
        ],
      };
    }

    const records = await db.knowledge_base_articles.findAll({
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
