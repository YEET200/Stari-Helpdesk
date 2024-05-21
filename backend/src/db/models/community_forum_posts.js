const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const community_forum_posts = sequelize.define(
    'community_forum_posts',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      content: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  community_forum_posts.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.community_forum_posts.belongsTo(db.users, {
      as: 'author',
      foreignKey: {
        name: 'authorId',
      },
      constraints: false,
    });

    db.community_forum_posts.belongsTo(db.users, {
      as: 'moderator',
      foreignKey: {
        name: 'moderatorId',
      },
      constraints: false,
    });

    db.community_forum_posts.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.community_forum_posts.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return community_forum_posts;
};
