const db = require('../config/db')
const type = db.Sequelize
const Produto = require('../models/produto.model')

let Fornecedor = db.define('fornecedor', {
  id: {
    type: type.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: type.STRING,
    allowNull: false
  },
  telefone: {
    type: type.STRING,
    allowNull: false,
  },
  cnpj: {
    type: type.STRING,
    allowNull: false,
  },
  email: {
    type: type.STRING,
    allowNull: false
  },
  cep: {
    type: type.STRING,
    allowNull: false
  },
  logradouro: {
    type: type.STRING,
    allowNull: false
  },
  bairro: {
    type: type.STRING,
    allowNull: false
  },
  municipio: {
    type: type.STRING,
    allowNull: false
  },
  uf: {
    type: type.STRING,
    allowNull: false
  },
  numero: {
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

Fornecedor.hasMany(Produto, {
  foreignKey: 'fornecedorId',
  onDelete: 'cascade',
  hooks: true
})

module.exports = Fornecedor


