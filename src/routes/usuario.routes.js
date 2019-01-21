const router = require('../server/index')
const service = require('../services/usuario.service')

router.get('/usuario', async (req, res, next) => {
  try {
    const usuarios = await service.findAll()
    res.send({ usuarios })
    next()
  } catch (error) {
    next(error)
  }
})

router.post('/usuario', async (req, res, next) => {
  try {
    const usuario = req.body
    const result = await service.create(usuario)
    res.send({ result })
    next()
  } catch (error) {
    next(error)
  }
})

module.exports = router
