const router = require('../server/index')
const service = require('../services/categoria.service')

router.get('/categoria', async (req, res, next) => {
  try {
    const categorias = await service.findAll()
    res.send({ categorias })
    next()
  } catch (error) {
    next(error)
  }
})

router.get('/categoria/:id', async (req, res, next) => {
  try {
    const data = req.params.id
    const categorias = await service.findById(data)
    res.send({ categorias })
    next()
  } catch (error) {
    next(error)
  }
})

router.post('/categoria', async (req, res, next) => {
  try {
    const categoria = req.body
    const result = await service.create(categoria)
    res.send({ result })
    next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
  }
})

router.put('/categoria', async (req, res, next) => {
  try {
    const data = req.body
    await service.update(data)
    res.send({ msg: 'Categoria atualizada com sucesso' })
    next()
  } catch (error) {
    next(error)
  }
})

router.del('/categoria/:id', async (req, res, next) => {
  try {
    const data = req.params.id
    await service.del(data)
    res.send({ msg: 'Categoria excluida com sucesso' })
    next()
  } catch (error) {
    next(error)
  }
})

module.exports = router
