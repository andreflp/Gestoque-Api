const model = require('../models/categoria.model')

function findAll() {
  return new Promise(async (resolve, reject) => {
    try {
      const categorias = await model.findAll()
      resolve(categorias)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function create(categoria) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await model.create(categoria)
      resolve(result)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function update(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const categoria = await model.create(id)
      resolve(categoria)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function del(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const categoria = await model.create(id)
      resolve(categoria)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}


module.exports = { findAll, create, update, del }