import express from 'express'
import { pool } from './db.js'
import employeesRoutes from './routes/employees.routes.js'

const app = express()

app.use(express.json())

app.get('/ping', async (req, res) => {
    const [result] = await pool.query('SELECT 1 + 1 AS result')
    res.json(result[0])
});

app.use('/api', employeesRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    })
})

export default app;

