const db = require('../config/db')
const type = db.Sequelize
const Produto = require('../models/produto.model')

let Categoria = db.define(
  'categoria',
  {
    id: {
      type: type.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: type.STRING,
      allowNull: false,
      unique: true
    },
    createdAt: {
      type: type.DATE,
      defaultValue: type.NOW
    }
  },
  {
    freezeTableName: true
  }
)

Categoria.hasMany(Produto, {
  foreignKey: 'categoriaId',
  onDelete: 'cascade',
  hooks: true
})

module.exports = Categoria
