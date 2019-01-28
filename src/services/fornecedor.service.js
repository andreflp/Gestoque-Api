import model from '../models/fornecedor.model'

function findAll () {
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
