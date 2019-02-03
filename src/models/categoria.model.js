import db from '../config/db'
import Produto from '../models/produto.model'
const type = db.Sequelize

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

Produto.belongsTo(Categoria, { as: 'categoria', onDelete: 'cascade' })

Categoria.hasMany(Produto, {
  foreignKey: { name: 'categoriaId', allowNull: false },
  onDelete: 'cascade',
  hooks: true
})

export default Categoria
