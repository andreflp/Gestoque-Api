const router = require('../server/index')
const service = require('../services/categoria.service')

router.get('/categoria', async (req, res, next) => {
  try {
    const categorias = await service.findAll()
    res.send({ categorias })
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
    next(error)
  }
})

module.exports = router

