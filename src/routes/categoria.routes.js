import server from '../server/index'
import { Router } from 'restify-router'
import service from '../services/categoria.service'
const router = new Router()

router.get('/categoria', async (req, res, next) => {
  try {
    const categorias = await service.findAll()
    res.send({ categorias })
    return next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
    return next()
  }
})

router.get('/categoria/:id', async (req, res, next) => {
  try {
    const data = req.params.id
    const categoria = await service.findById(data)
    if (categoria === null) {
      res.send(404, { msg: 'Categoria não encontrada' })
      return next(false)
    }
    res.send({ categoria })
    return next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
    return next()
  }
})

router.post('/categoria', async (req, res, next) => {
  try {
    const categoria = req.body
    const result = await service.create(categoria)
    res.send({ result })
    return next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
    return next()
  }
})

router.put('/categoria/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const data = req.body
    const categoria = await service.findById(id)
    if (categoria === null) {
      res.send(404, { msg: 'Categoria não encontrada' })
      return next(false)
    }
    await service.update(data, id)
    res.send({ msg: 'Categoria atualizada com sucesso' })
    return next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
    return next()
  }
})

router.del('/categoria/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const categoria = await service.findById(id)
    if (categoria === null) {
      res.send(404, { msg: 'Categoria não encontrada' })
      return next(false)
    }
    await service.del(id)
    res.send({ msg: 'Categoria excluida com sucesso' })
    return next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
    return next()
  }
})

router.applyRoutes(server)

export default router
