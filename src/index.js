import {} from 'dotenv/config'
import server from './server'
import './routes/router'

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})
