import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import taskRoute from './routes/task.route.js'

const app = express()
dotenv.config()
mongoose.set('strictQuery', true)

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Error connecting to database', error)
    }
}

app.use(cors({origin: ['http://localhost:5173', 'http://localhost:5174', 'https://task-management-three-puce.vercel.app'], credentials: true}))

app.use(express.json())
app.use(cookieParser())
app.use('/api/tasks', taskRoute)



app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || 'Something went wrong'

    return res.status(errorStatus).send(errorMessage)

})

app.listen(8800, () => {
    connect()
    console.log('Server is running on port 8800')
})