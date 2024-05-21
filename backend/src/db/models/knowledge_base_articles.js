const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const knowledge_base_articles = sequelize.define(
    'knowledge_base_articles',
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

      category: {
        type: DataTypes.ENUM,

        values: ['product_guides', 'troubleshooting', 'faqs', 'best_practices'],
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

  knowledge_base_articles.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.knowledge_base_articles.belongsTo(db.users, {
      as: 'author',
      foreignKey: {
        name: 'authorId',
      },
      constraints: false,
    });

    db.knowledge_base_articles.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.knowledge_base_articles.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return knowledge_base_articles;
};
