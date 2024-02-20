import express from 'express'
import cors from "cors";
import employeesRoutes from './routes/employee.routes.js'
import userRoutes from './routes/user.routes.js'
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

//Configuracion del servidor
const app = express()

//Configurar cors
app.use(cors())

//Convertir body a objeto js
app.use(express.json()) // recibir datos con content-type app/json
app.use(express.urlencoded({extended:true})) // datos con formato form-urlencoded

//Lllamando rutas de empleados
app.use('/api', employeesRoutes)

//Lllamando rutas de usuarios
app.use('/api', userRoutes)

//Manejo de errores
app.use(notFound)
app.use(errorHandler)

export default app;

