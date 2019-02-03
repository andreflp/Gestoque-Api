import server from '../server/index'
import { Router } from 'restify-router'
import service from '../services/usuario.service'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = new Router()

function compararSenhas (senha, senhaUsuario) {
  return bcrypt.compareSync(senha, senhaUsuario)
}

router.post('/login', async (req, res, next) => {
  try {
    const { usuario, senha } = req.body
    const result = await service.findByUsuario(usuario)
    if (result && compararSenhas(senha, result.senha)) {
      const token = jwt.sign(
        { sub: result.usuario, iss: 'gestoque-api' },
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24 }
      )

      res.send({ usuario: result.usuario, token })
    } else {
      res.send(403, { error: 'Credencial inválida' })
      next()
    }
  } catch (error) {
    next(error)
  }
})

router.applyRoutes(server)

export default router
