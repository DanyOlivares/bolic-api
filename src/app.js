import express from 'express'
import config from './config'

import DoctoresRoutes from './routes/Doctores.routes'
const app= express()

app.set('port', config.port)

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(DoctoresRoutes)
export default app

