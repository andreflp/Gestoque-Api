const db = require('../config/db')
const type = db.Sequelize
const Produto = require('../models/produto.model')

let Movimentacao = db.define('movimentacao', {
  id: {
    type: type.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  tipo: {
    type: type.STRING,
    allowNull: false
  },
  quantidade: {
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

Produto.hasOne(Movimentacao, {
  foreignKey: 'produtoId',
  onDelete: 'cascade',
  hooks: true
})

module.exports = Movimentacao


