const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const support_tickets = sequelize.define(
    'support_tickets',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      status: {
        type: DataTypes.ENUM,

        values: ['open', 'in_progress', 'resolved', 'closed'],
      },

      comments: {
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

  support_tickets.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.support_tickets.belongsTo(db.users, {
      as: 'customer',
      foreignKey: {
        name: 'customerId',
      },
      constraints: false,
    });

    db.support_tickets.belongsTo(db.users, {
      as: 'assigned_agent',
      foreignKey: {
        name: 'assigned_agentId',
      },
      constraints: false,
    });

    db.support_tickets.hasMany(db.file, {
      as: 'Attachments',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.support_tickets.getTableName(),
        belongsToColumn: 'Attachments',
      },
    });

    db.support_tickets.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.support_tickets.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return support_tickets;
};
