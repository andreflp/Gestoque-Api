require('dotenv').config()
const server = require('./server')
require('./routes/router')

server.listen(3000, router => {
  console.log('Listing in port 3000')
})
