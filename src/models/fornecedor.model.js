import db from '../config/db'
import Produto from '../models/produto.model'
const type = db.Sequelize

let Fornecedor = db.define(
  'fornecedor',
  {
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
      allowNull: false
    },
    cnpj: {
      type: type.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: type.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
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
  },
  {
    freezeTableName: true
  }
)

Produto.belongsTo(Fornecedor, { onDelete: 'cascade' })

Fornecedor.hasMany(Produto, {
  foreignKey: { name: 'fornecedorId', allowNull: false },
  onDelete: 'cascade',
  hooks: true
})

export default Fornecedor
