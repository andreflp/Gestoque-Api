const model = require('../models/fornecedor.model')

function findAll() {
  return new Promise(async (resolve, reject) => {
    try {
      const fornecedores = await model.findAll()
      resolve(fornecedores)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function create(fornecedor) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await model.create(fornecedor)
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
      const fornecedor = await model.create(id)
      resolve(fornecedor)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function del(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const fornecedor = await model.create(id)
      resolve(fornecedor)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}


module.exports = { findAll, create, update, del }