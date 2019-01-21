const restify = require('restify')
const server = restify.createServer()
const cors = require('./cors')
/* const jwtMiddleware = require('./jwtMiddleware') */

/* const exclusions = ['/auth'] */

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser({ mapParams: true }))
/* server.use(jwtMiddleware({ exclusions })) */

module.exports = server
