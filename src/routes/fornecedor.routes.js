const Router = require('restify-router').Router
const router = new Router()
const service = require('../services/fornecedor.service')
const server = require('../server/index')

router.get('/fornecedor', async (req, res, next) => {
  try {
    const fornecedores = await service.findAll()
    res.send({ fornecedores })
    return next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
    return next()
  }
})

router.get('/fornecedor/:id', async (req, res, next) => {
  try {
    const data = req.params.id
    const fornecedor = await service.findById(data)
    if (fornecedor === null) {
      res.send(404, { msg: 'Fornecedor não encontrado' })
      return next(false)
    }
    res.send({ fornecedor })
    return next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
    return next()
  }
})

router.post('/fornecedor', async (req, res, next) => {
  try {
    const fornecedor = req.body
    const result = await service.create(fornecedor)
    res.send({ fornecedor: result })
    return next()
  } catch (error) {
    res.send(400, { error: error.message })
    return next()
  }
})

router.put('/fornecedor/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const data = req.body
    const fornecedor = await service.findById(id)
    if (fornecedor === null) {
      res.send(404, { msg: 'Fornecedor não encontrado' })
      return next(false)
    }
    await service.update(data, id)
    res.send({ msg: 'Fornecedor atualizado com sucesso' })
    return next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
    return next()
  }
})

router.del('/fornecedor/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const fornecedor = await service.findById(id)
    if (fornecedor === null) {
      res.send(404, { msg: 'Fornecedor não encontrada' })
      return next(false)
    }
    await service.del(id)
    res.send({ msg: 'Fornecedor excluido com sucesso' })
    return next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
    return next()
  }
})

router.applyRoutes(server)

module.exports = router
