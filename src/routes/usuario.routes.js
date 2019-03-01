import { Router } from 'restify-router'
import service from '../services/usuario.service'
import server from '../server/index'
import errorHandler from '../server/errorHandler'
const router = new Router()

router.get('/usuario', async (req, res, next) => {
  try {
    const usuarios = await service.findAll()
    res.send({ usuarios })
    next()
  } catch (error) {
    next(error)
  }
})

router.get('/usuario/:usuario', async (req, res, next) => {
  try {
    const data = req.params.usuario
    const usuario = await service.findByUsuario(data)
    if (usuario === null) {
      res.send(404, { message: 'Usuário não encontrado' })
      next(false)
    }
    res.send({ usuario })
    next()
  } catch (error) {
    res.send(400, { error: error.name })
    next()
  }
})

router.post('/usuario/signup', async (req, res, next) => {
  try {
    const usuario = req.body
    const usuarioEmail = await service.findByEmail(usuario.email)
    const usuarioUsuario = await service.findByUsuario(usuario.usuario)
    if (usuarioUsuario && usuarioUsuario.usuario === usuario.usuario) {
      res.send(400, { message: 'Usuário já cadastrado' })
      return next(false)
    }

    if (usuarioEmail && usuarioEmail.email === usuario.email) {
      res.send(400, { message: 'Email já cadastrado' })
      return next(false)
    }
    const result = await service.create(usuario)
    res.send({ usuario: result })
    next()
  } catch (error) {
    errorHandler(res, error, next)
  }
})

router.put('/usuario/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const data = req.body
    const usuario = await service.findById(id)
    if (usuario === null) {
      res.send(404, { message: 'Usuário não encontrado' })
      next(false)
    }
    await service.update(data, id)
    res.send({ message: 'Usuário atualizado com sucesso' })
    next()
  } catch (error) {
    res.send(400, { error: error.name })
    next()
  }
})

router.del('/usuario/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const usuario = await service.findById(id)
    if (usuario === null) {
      res.send(404, { message: 'Usuário não encontrada' })
      next(false)
    }
    await service.del(id)
    res.send({ message: 'Usuário excluido com sucesso' })
    next()
  } catch (error) {
    res.send(400, { error: error.name })
    next()
  }
})

router.applyRoutes(server)

export default router
