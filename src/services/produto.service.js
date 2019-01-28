import Fornecedor from '../models/fornecedor.model'
import Categoria from '../models/categoria.model'
import model from '../models/produto.model'

function findAll () {
  return new Promise(async (resolve, reject) => {
    try {
      const produtos = await model.findAll({
        include: [
          {
            model: Categoria,
            as: 'categoria',
            attributes: { exclude: ['createdAt'] }
          },
          { model: Fornecedor, attributes: { exclude: ['createdAt'] } }
        ]
      })
      resolve(produtos)
    } catch (error) {
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
      reject(error)
    }
  })
}

export default { findAll, create, update, del, findById }
