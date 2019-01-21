const router = require('../server/index')
const serviceProduto = require('../services/produto.service')
const serviceMovimentacao = require('../services/produto.service')

router.get('/produto', async (req, res, next) => {
  try {
    const produtos = await serviceProduto.findAll()
    res.send({ produtos })
  } catch (error) {
    next(error)
  }
})

router.get('/produto/:id', async (req, res, next) => {
  try {
    const data = req.params.id
    const fornecedor = await serviceProduto.findById(data)
    res.send({ fornecedor })
    next()
  } catch (error) {
    next(error)
  }
})

router.post('/produto', async (req, res, next) => {
  try {
    const produto = req.body
    const result = await serviceProduto.create(produto)
    res.send({ result })
    next()
  } catch (error) {
    next(error)
  }
})

router.put('/produto/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const data = req.body
    await serviceProduto.update(data, id)
    res.send({ msg: 'Fornecedor atualizado com sucesso' })
    next()
  } catch (error) {
    next(error)
  }
})

router.del('/produto/:id', async (req, res, next) => {
  try {
    const data = req.params.id
    await serviceProduto.del(data)
    res.send({ msg: 'Fornecedor excluido com sucesso' })
    next()
  } catch (error) {
    next(error)
  }
})

module.exports = router
