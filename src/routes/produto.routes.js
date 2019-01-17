const router = require('../server/index')
const service = require('../services/produto.service')

router.get('/produto', async (req, res, next) => {
  try {
    const produtos = await service.findAll()
    res.send({ produtos })
  } catch (error) {
    next(error)
  }
})

router.post('/produto', async (req, res, next) => {
  try {
    const produto = req.body
    const result = await service.create(produto)
    res.send({ result })
    next()
  } catch (error) {
    next(error)
  }
})

module.exports = router

