import server from '../server/index'
import { Router } from 'restify-router'
import serviceProduto from '../services/produto.service'
import serviceMovimentacao from '../services/movimentacao.service'
const router = new Router()

router.get('/produto', async (req, res, next) => {
  try {
    let pagination = req.query
    const produtos = await serviceProduto.findAll(pagination)
    res.send({ produtos })
  } catch (error) {
    res.send(400, { error })
    return next()
  }
})

router.get('/produto/:id', async (req, res, next) => {
  try {
    const data = req.params.id
    const produto = await serviceProduto.findById(data)
    if (produto === null) {
      res.send(404, { msg: 'Produto não encontrado' })
      return next(false)
    }
    res.send({ produto })
    next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
    return next()
  }
})

router.post('/produto', async (req, res, next) => {
  try {
    const produto = req.body
    const result = await serviceProduto.create(produto)
    let movimentacao = {
      tipo: 'E',
      quantidade: result.quantidade,
      produtoId: result.id
    }
    await serviceMovimentacao.create(movimentacao)
    res.send({ result })
    next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
    return next()
  }
})

router.put('/produto/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const data = req.body
    const produto = serviceProduto.findById(id)
    if (produto === null) {
      res.send(404, { msg: 'Produto não encontrado' })
      return next(false)
    }
    await serviceProduto.update(data, id)
    res.send({ msg: 'Fornecedor atualizado com sucesso' })
    next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
    return next()
  }
})

router.del('/produto/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const produto = serviceProduto.findById(id)
    if (produto === null) {
      res.send(404, { msg: 'Produto não encontrado' })
      return next(false)
    }
    await serviceProduto.del(id)
    res.send({ msg: 'Fornecedor excluido com sucesso' })
    next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
    return next()
  }
})

router.applyRoutes(server)

export default router
