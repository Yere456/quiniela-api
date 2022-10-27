import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import equiposRoutes from './routes/equipos.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/', equiposRoutes)

export default app