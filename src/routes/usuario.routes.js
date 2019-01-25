const Router = require('restify-router').Router
const router = new Router()
const service = require('../services/usuario.service')
const server = require('../server/index')

router.get('/usuario', async (req, res, next) => {
  try {
    const usuarios = await service.findAll()
    res.send({ usuarios })
    return next()
  } catch (error) {
    next(error)
  }
})

router.get('/usuario/:usuario', async (req, res, next) => {
  try {
    const data = req.params.usuario
    const usuario = await service.findByUsuario(data)
    if (usuario === null) {
      res.send(404, { msg: 'Usuário não encontrado' })
      return next(false)
    }
    res.send({ usuario })
    return next()
  } catch (error) {
    res.send(400, { error })
    return next()
  }
})

router.post('/usuario', async (req, res, next) => {
  try {
    const usuario = req.body
    const result = await service.create(usuario)
    res.send({ usuario: result })
    next()
  } catch (error) {
    next(error)
    return next()
  }
})

router.put('/usuario/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const data = req.body
    const usuario = await service.findById(id)
    if (usuario === null) {
      res.send(404, { msg: 'Usuário não encontrado' })
      return next(false)
    }
    await service.update(data, id)
    res.send({ msg: 'Usuário atualizado com sucesso' })
    return next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
    return next()
  }
})

router.del('/usuario/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const usuario = await service.findById(id)
    if (usuario === null) {
      res.send(404, { msg: 'Usuário não encontrada' })
      return next(false)
    }
    await service.del(id)
    res.send({ msg: 'Usuário excluido com sucesso' })
    return next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
    return next()
  }
})

router.applyRoutes(server)

module.exports = router
