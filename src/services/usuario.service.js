const model = require('../models/usuario.model')

function findAll () {
  return new Promise(async (resolve, reject) => {
    try {
      const usuarios = await model.findAll()
      resolve(usuarios)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function create (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const usuario = await model.create(data)
      resolve(usuario)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function update (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const usuario = await model.update(data, { where: { id: data.id } })
      resolve(usuario)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function del (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const usuario = await model.destroy({ where: { id } })
      resolve(usuario)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

module.exports = { findAll, create, update, del }
