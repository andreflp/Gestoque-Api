import server from '../server/index'
import { Router } from 'restify-router'
import serviceMovimentacao from '../services/movimentacao.service'
import serviceProduto from '../services/produto.service'
const router = new Router()

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
    if (produto === null) {
      res.send(400, { msg: 'Produto não enconrado' })
      next(false)
    }
    if (movimentacao.tipo === 'E') {
      entrada = produto.quantidade + movimentacao.quantidade
      produto.quantidade = entrada
      produto.save()
    } else if (movimentacao.tipo === 'S') {
      if (movimentacao.quantidade > produto.quantidade) {
        res.send(400, { msg: 'Quantidade maior que a do produto' })
        next(false)
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

router.applyRoutes(server)

export default router
