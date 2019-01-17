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

module.exports = router

