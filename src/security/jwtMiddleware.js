import jwt from 'jsonwebtoken'

const jwtMiddleware = deps => {
  return async (req, res, next) => {
    if (!deps.routes.includes(req.href())) {
      const token = getToken(req)
      if (!token) {
        res.send(403, { error: 'Token inválido' })
        return next(false)
      }
      try {
        req.decoded = jwt.verify(token, process.env.SECRET)
        next()
      } catch (error) {
        res.send(403, { error: 'Falha ao autenticar o token' })
        next(false)
      }
    } else {
      next()
    }
  }
}

function getToken (req) {
  const authorization = req.header('authorization')
  if (authorization) {
    const partes = authorization.split(' ')
    if (partes.length === 2 && partes[0] === 'Bearer') {
      return partes[1]
    }
  }
  return undefined
}

export default jwtMiddleware
