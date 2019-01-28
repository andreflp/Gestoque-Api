import {} from 'dotenv/config'
import server from './server'
import './routes/router'

server.listen(3000, router => {
  console.log('Listing in port 3000')
})
