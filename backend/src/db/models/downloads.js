const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const downloads = sequelize.define(
    'downloads',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      category: {
        type: DataTypes.ENUM,

        values: ['software_updates', 'drivers', 'templates', 'mobile_apps'],
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

  downloads.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.downloads.hasMany(db.file, {
      as: 'file',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.downloads.getTableName(),
        belongsToColumn: 'file',
      },
    });

    db.downloads.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.downloads.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return downloads;
};
