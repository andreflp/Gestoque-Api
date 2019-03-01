import model from '../models/fornecedor.model'
import sequelize from '../config/db'
const Op = sequelize.Op

function findAll (pagination) {
  return new Promise(async (resolve, reject) => {
    try {
      let limit = parseInt(pagination.rowsPerPage)
      const fornecedoresCount = await model.findAndCountAll({
        where: {
          nome: { [Op.like]: '%' + pagination.nome + '%' }
        },
        order: [['nome', 'ASC']]
      })
      let page = parseInt(pagination.page)
      let pages = Math.ceil(fornecedoresCount.count / limit)
      let offset = limit * (page - 1)
      let fornecedores = await model.findAll({
        where: { nome: { [Op.like]: '%' + pagination.nome + '%' } },
        order: [['nome', 'ASC']],
        limit: limit,
        offset: offset
      })
      page = parseInt(pagination.page)
      pages = Math.ceil(fornecedoresCount.count / limit)
      offset = limit * (page - 1)
      resolve({ fornecedores, count: fornecedoresCount.count, pages })
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function findById (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const fornecedor = await model.findByPk(id)
      resolve(fornecedor)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function create (fornecedor) {
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

function update (data, id) {
  return new Promise(async (resolve, reject) => {
    try {
      const fornecedor = await model.update(data, { where: { id } })
      resolve(fornecedor)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function del (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const fornecedor = await model.destroy({ where: { id } })
      resolve(fornecedor)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

export default { findAll, findById, create, update, del }
