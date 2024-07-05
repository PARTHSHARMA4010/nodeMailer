import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
dotenv.config()
import cors from 'cors'
import DB_NAME from './constants.js'
import { UserRouter } from './routes/user.js'


const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(cookieParser())
app.use('/auth', UserRouter)


mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})