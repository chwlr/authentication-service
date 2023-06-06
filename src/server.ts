import express from 'express'
import cookieSession from 'cookie-session'

const server = express()
server.set('trust proxy', true)
server.use(express.json())
server.use(
  cookieSession({
    signed: false,
    secure: true
  })
)

export default server