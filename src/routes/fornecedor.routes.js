const router = require('../server/index')
const service = require('../services/fornecedor.service')

router.get('/fornecedor', async (req, res, next) => {
  try {
    const fornecedores = await service.findAll()
    res.send({ fornecedores })
  } catch (error) {
    next(error)
  }
})

router.get('/fornecedor/:id', async (req, res, next) => {
  try {
    const data = req.params.id
    const fornecedor = await service.findById(data)
    res.send({ fornecedor })
    next()
  } catch (error) {
    next(error)
  }
})

router.post('/fornecedor', async (req, res, next) => {
  try {
    const fornecedor = req.body
    console.log({ fornecedor })
    const result = await service.create(fornecedor)
    res.send({ result })
    next()
  } catch (error) {
    next(error)
  }
})

router.put('/fornecedor/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const data = req.body
    await service.update(data, id)
    res.send({ msg: 'Fornecedor atualizado com sucesso' })
    next()
  } catch (error) {
    next(error)
  }
})

router.del('/fornecedor/:id', async (req, res, next) => {
  try {
    const data = req.params.id
    await service.del(data)
    res.send({ msg: 'Fornecedor excluido com sucesso' })
    next()
  } catch (error) {
    next(error)
  }
})

module.exports = router
