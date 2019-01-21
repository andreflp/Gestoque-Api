const model = require('../models/movimentacao.model')

function findAll () {
  return new Promise(async (resolve, reject) => {
    try {
      const movimentacoes = await model.findAll()
      resolve(movimentacoes)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function create (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const movimentacao = await model.create(data)
      resolve(movimentacao)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function update (data) {
  return new Promise(async (resolve, reject) => {
    try {
      const movimentacao = await model.update(data, { where: { id: data.id } })
      resolve(movimentacao)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function del (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const movimentacao = await model.destroy({ where: { id } })
      resolve(movimentacao)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

module.exports = { findAll, create, update, del }
