import restify from 'restify'
import cors from './cors'
import jwtMiddleware from '../security/jwtMiddleware'
const server = restify.createServer()
const routes = ['/login', '/usuario/signup']

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser({ mapParams: true }))
server.use(restify.plugins.queryParser())
server.use(jwtMiddleware({ routes }))

export default server
