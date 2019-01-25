const db = require('../config/db')
const type = db.Sequelize
const bcrypt = require('bcrypt')

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
      }
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
  },
  {
    freezeTableName: true
  }
)

Usuario.beforeCreate(async (usuario, options) => {
  const hash = await bcrypt.hash(usuario.senha, 10)
  usuario.senha = hash
})

module.exports = Usuario
