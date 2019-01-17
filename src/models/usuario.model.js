const db = require('../config/db')
const type = db.Sequelize

let Usuario = db.define('usuario', {
  id: {
    type: type.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: type.STRING,
    allowNull: false
  },
  sobrenome: {
    type: type.STRING,
    allowNull: false
  },
  email: {
    type: type.STRING,
    allowNull: false
  },
  usuario: {
    type: type.STRING,
    allowNull: false
  },
  senha: {
    type: type.STRING,
    allowNull: false
  },
  createdAt: {
    type: type.DATE,
    defaultValue: type.NOW
  }
}, {
    freezeTableName: true,
  })

module.exports = Usuario


