const router = require('../server/index')
const service = require('../services/movimentacao.service')

router.get('/movimentacao', async (req, res, next) => {
  try {
    const movimentacoes = await service.findAll()
    res.send({ movimentacoes })
  } catch (error) {
    next(error)
  }
})

router.post('/movimentacao', async (req, res, next) => {
  try {
    const movimentacao = req.body
    const result = await service.create(movimentacao)
    res.send({ result })
    next()
  } catch (error) {
    next(error)
  }
})

module.exports = router

