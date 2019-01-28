import db from '../config/db'
import Produto from '../models/produto.model'
const type = db.Sequelize

let Movimentacao = db.define(
  'movimentacao',
  {
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
      type: type.INTEGER,
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

Produto.hasOne(Movimentacao, {
  foreignKey: 'produtoId',
  onDelete: 'cascade',
  hooks: true
})

export default Movimentacao
