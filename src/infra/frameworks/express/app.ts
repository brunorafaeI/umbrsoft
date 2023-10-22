import 'express-async-errors'

import express from 'express'
import cors from 'cors'
import routes from '@/infra/frameworks/express/routes'
import { onError, onRequest } from './middlewares'

const app = express()

app.use(cors())
app.use(express.json())
app.use(onRequest, onError)

app.use('/api', routes, (_, res) => {
  res.status(200).json({ message: 'Welcome to my Api REST' })
})

app.use('/', (_, res) => {
  res.status(200).json({ message: 'Welcome to my home page.' })
})

export default app
