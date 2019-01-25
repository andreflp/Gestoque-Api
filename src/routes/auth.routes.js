const Router = require('restify-router').Router
const router = new Router()
const service = require('../services/usuario.service')
const server = require('../server/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function compararSenhas (senha, senhaUsuario) {
  return bcrypt.compareSync(senha, senhaUsuario)
}

router.post('/auth', async (req, res, next) => {
  try {
    const { usuario, senha } = req.body
    const result = await service.findByUsuario(usuario)
    if (result && compararSenhas(senha, result.senha)) {
      const token = jwt.sign(
        {
          sub: result.usuario,
          iss: 'gestoque-api'
        },
        process.env.SECRET
      )

      res.send({ usuario: result.usuario, token })
    } else {
      res.send({ error: 'Credencial inválida' })
      return next()
    }
  } catch (error) {
    next(error)
    return next()
  }
})

router.applyRoutes(server)

module.exports = router
