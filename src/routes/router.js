const produtos = require('./produto.routes')
const fornecedores = require('./fornecedor.routes')
const categorias = require('./categoria.routes')
const movimentacoes = require('./movimentacao.routes')
const usuarios = require('./usuario.routes')

const router = [produtos, fornecedores, categorias, movimentacoes, usuarios]

module.exports = router
