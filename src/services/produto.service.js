const model = require('../models/produto.model')

function findAll () {
  return new Promise(async (resolve, reject) => {
    try {
      const produtos = await model.findAll()
      resolve(produtos)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function findById (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const produto = await model.findByPk(id)
      resolve(produto)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function create (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const produto = await model.create(data)
      resolve(produto)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function update (data, id) {
  return new Promise(async (resolve, reject) => {
    try {
      const produto = await model.update(data, { where: { id } })
      resolve(produto)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function del (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const produto = await model.destroy({ where: { id } })
      resolve(produto)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

module.exports = { findAll, create, update, del, findById }
