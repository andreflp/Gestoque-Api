import Fornecedor from '../models/fornecedor.model'
import Categoria from '../models/categoria.model'
import model from '../models/produto.model'
import sequelize from '../config/db'
const Op = sequelize.Op

function findAll (pagination) {
  return new Promise(async (resolve, reject) => {
    try {
      let sort = pagination.descending
      console.log('AQUIIIIIII', sort)
      let limit = parseInt(pagination.rowsPerPage)
      const produtosCount = await model.findAndCountAll({
        where: { nome: { [Op.like]: '%' + pagination.nome + '%' } },
        order: [['nome', sort ? 'DESC' : 'ASC']]
      })
      let page = parseInt(pagination.page)
      let pages = Math.ceil(produtosCount.count / limit)
      let offset = limit * (page - 1)
      const produtos = await model.findAll({
        where: { nome: { [Op.like]: '%' + pagination.nome + '%' } },
        order: [['nome', sort ? 'DESC' : 'ASC']],
        limit: limit,
        offset: offset,
        include: [
          {
            model: Categoria,
            as: 'categoria',
            attributes: { exclude: ['createdAt'] }
          },
          { model: Fornecedor, attributes: { exclude: ['createdAt'] } }
        ]
      })
      page = parseInt(pagination.page)
      pages = Math.ceil(produtosCount.count / limit)
      offset = limit * (page - 1)
      resolve({ produtos, count: produtosCount.count, pages })
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
