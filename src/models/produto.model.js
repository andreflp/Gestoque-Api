import db from '../config/db'
const type = db.Sequelize

let Produto = db.define(
  'produto',
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
    codigo: {
      type: type.STRING,
      allowNull: false,
      unique: true
    },
    quantidade: {
      type: type.INTEGER,
      allowNull: false
    },
    preco: {
      type: type.DECIMAL(12, 2),
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

export default Produto
