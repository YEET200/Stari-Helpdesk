const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const training_and_tutorials = sequelize.define(
    'training_and_tutorials',
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

      type: {
        type: DataTypes.ENUM,

        values: [
          'video_tutorials',

          'webinars',

          'workshops',

          'e_learning_courses',
        ],
      },

      start_date: {
        type: DataTypes.DATE,
      },

      end_date: {
        type: DataTypes.DATE,
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

  training_and_tutorials.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.training_and_tutorials.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.training_and_tutorials.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return training_and_tutorials;
};
