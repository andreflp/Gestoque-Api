import model from '../models/categoria.model'
import sequelize from '../config/db'
const Op = sequelize.Op

function findAll (pagination) {
  return new Promise(async (resolve, reject) => {
    try {
      let limit = parseInt(pagination.rowsPerPage)
      const categoriasCount = await model.findAndCountAll({
        where: { nome: { [Op.like]: '%' + pagination.nome + '%' } },
        order: [['nome', 'ASC']]
      })
      let page = parseInt(pagination.page)
      let pages = Math.ceil(categoriasCount.count / limit)
      let offset = limit * (page - 1)
      let categorias = await model.findAll({
        where: { nome: { [Op.like]: '%' + pagination.nome + '%' } },
        order: [['nome', 'ASC']],
        limit: limit,
        offset: offset
      })
      page = parseInt(pagination.page)
      pages = Math.ceil(categoriasCount.count / limit)
      offset = limit * (page - 1)

      resolve({ categorias, count: categoriasCount.count, pages })
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function findById (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const categoria = await model.findByPk(id)
      resolve(categoria)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function create (categoria) {
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

function update (data, id) {
  return new Promise(async (resolve, reject) => {
    try {
      const categoria = await model.update(data, { where: { id } })
      resolve(categoria)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function del (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const categoria = await model.destroy({ where: { id } })
      resolve(categoria)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

export default { findAll, findById, create, update, del }

/* where: {
  [Op.or]: [{ nome: { [Op.like]: '%' + pagination.nome + '%' } }]
}, */
