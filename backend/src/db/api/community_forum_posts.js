const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Community_forum_postsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const community_forum_posts = await db.community_forum_posts.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        content: data.content || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await community_forum_posts.setAuthor(data.author || null, {
      transaction,
    });

    await community_forum_posts.setModerator(data.moderator || null, {
      transaction,
    });

    return community_forum_posts;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const community_forum_postsData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      content: item.content || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const community_forum_posts = await db.community_forum_posts.bulkCreate(
      community_forum_postsData,
      { transaction },
    );

    // For each item created, replace relation files

    return community_forum_posts;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const community_forum_posts = await db.community_forum_posts.findByPk(
      id,
      {},
      { transaction },
    );

    await community_forum_posts.update(
      {
        title: data.title || null,
        content: data.content || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await community_forum_posts.setAuthor(data.author || null, {
      transaction,
    });

    await community_forum_posts.setModerator(data.moderator || null, {
      transaction,
    });

    return community_forum_posts;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const community_forum_posts = await db.community_forum_posts.findByPk(
      id,
      options,
    );

    await community_forum_posts.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await community_forum_posts.destroy({
      transaction,
    });

    return community_forum_posts;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const community_forum_posts = await db.community_forum_posts.findOne(
      { where },
      { transaction },
    );

    if (!community_forum_posts) {
      return community_forum_posts;
    }

    const output = community_forum_posts.get({ plain: true });

    output.author = await community_forum_posts.getAuthor({
      transaction,
    });

    output.moderator = await community_forum_posts.getModerator({
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

      {
        model: db.users,
        as: 'moderator',
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
          [Op.and]: Utils.ilike('community_forum_posts', 'title', filter.title),
        };
      }

      if (filter.content) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'community_forum_posts',
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

      if (filter.author) {
        var listItems = filter.author.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          authorId: { [Op.or]: listItems },
        };
      }

      if (filter.moderator) {
        var listItems = filter.moderator.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          moderatorId: { [Op.or]: listItems },
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
          count: await db.community_forum_posts.count({
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
      : await db.community_forum_posts.findAndCountAll({
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
          Utils.ilike('community_forum_posts', 'title', query),
        ],
      };
    }

    const records = await db.community_forum_posts.findAll({
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
