const { db, DataTypes } = require('../utils/database.util');

const Solicitude = db.define('solicitude', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resume: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_employee: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { Solicitude };
