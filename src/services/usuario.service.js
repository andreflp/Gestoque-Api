import model from '../models/usuario.model'

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

function findById (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const usuario = await model.findByPk(id)
      resolve(usuario)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function findByUsuario (usuario) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await model.findOne({
        where: { usuario: usuario },
        attributes: ['usuario', 'senha']
      })
      resolve(result)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function findByEmail (usuario) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await model.findOne({
        where: { email: usuario },
        attributes: ['email']
      })
      resolve(result)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

function create (usuario) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await model.create(usuario)
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
      const usuario = await model.update(data, { where: { id } })
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

export default {
  findAll,
  create,
  update,
  del,
  findById,
  findByUsuario,
  findByEmail
}
