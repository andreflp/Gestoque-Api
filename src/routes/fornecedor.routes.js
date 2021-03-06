import server from '../server/index'
import service from '../services/fornecedor.service'
import { Router } from 'restify-router'
import errorHandler from '../server/errorHandler'
const router = new Router()

router.get('/fornecedor', async (req, res, next) => {
  try {
    let pagination = req.query
    const fornecedores = await service.findAll(pagination)
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
      res.send(404, { message: 'Fornecedor não encontrado' })
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
    errorHandler(res, error, next)
  }
})

router.put('/fornecedor/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const data = req.body
    const fornecedor = await service.findById(id)
    if (fornecedor === null) {
      res.send(404, { message: 'Fornecedor não encontrado' })
      return next(false)
    }
    await service.update(data, id)
    res.send({ message: 'Fornecedor atualizado com sucesso' })
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
      res.send(404, { message: 'Fornecedor não encontrada' })
      return next(false)
    }
    await service.del(id)
    res.send({ message: 'Fornecedor excluido com sucesso' })
    return next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
    return next()
  }
})

router.applyRoutes(server)

export default router
