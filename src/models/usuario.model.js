import db from '../config/db'
import bcrypt from 'bcrypt'
const type = db.Sequelize

const Usuario = db.define(
  'usuario',
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
    sobrenome: {
      type: type.STRING,
      allowNull: false
    },
    email: {
      type: type.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: true
    },
    usuario: {
      type: type.STRING,
      allowNull: false,
      unique: true
    },
    senha: {
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

Usuario.beforeCreate(async (usuario, options) => {
  const hash = await bcrypt.hash(usuario.senha, 10)
  usuario.senha = hash
})

export default Usuario
