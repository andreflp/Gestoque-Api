const router = require('../server/index')
const serviceMovimentacao = require('../services/movimentacao.service')
const serviceProduto = require('../services/produto.service')

router.get('/movimentacao', async (req, res, next) => {
  try {
    const movimentacoes = await serviceMovimentacao.findAll()
    res.send({ movimentacoes })
  } catch (error) {
    next(error)
  }
})

router.post('/movimentacao', async (req, res, next) => {
  try {
    const movimentacao = req.body
    let entrada
    let saida
    let produto = await serviceProduto.findById(movimentacao.produtoId)

    if (movimentacao.tipo === 'E') {
      entrada = produto.quantidade + movimentacao.quantidade
      produto.quantidade = entrada
      produto.save()
    } else if (movimentacao.tipo === 'S') {
      if (movimentacao.quantidade > produto.quantidade) {
        res.send(400, { error: 'Quantidade maior do que a do produto' })
        return false
      }
      saida = produto.quantidade - movimentacao.quantidade
      produto.quantidade = saida
      produto.save()
    }

    await serviceMovimentacao.create(movimentacao)
    res.send({ msg: 'Movimentação feita com sucesso' })
    next()
  } catch (error) {
    next(error)
  }
})

module.exports = router
