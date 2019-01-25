const restify = require('restify')
const server = restify.createServer()
const cors = require('./cors')
const jwtMiddleware = require('../security/jwtMiddleware')
let routes = ['/auth']

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser({ mapParams: true }))
server.use(jwtMiddleware({ routes }))

module.exports = server
