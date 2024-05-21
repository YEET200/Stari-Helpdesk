const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const settings = sequelize.define(
    'settings',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      Database_user: {
        type: DataTypes.TEXT,
      },

      Database_Password: {
        type: DataTypes.TEXT,
      },

      Database_Port: {
        type: DataTypes.TEXT,
      },

      Databose_Host: {
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

  settings.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.settings.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.settings.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return settings;
};
