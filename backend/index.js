import express from "express";
import bodyParser from 'body-parser'
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import cors from 'cors'
import cookieParser from "cookie-parser";

import authRoutes from './routes/auth.routes.js'
import adminRoutes from './routes/admin.routes.js'
import userRoutes from './routes/user.routes.js'
import projectsRoutes from './routes/projects.routes.js'

import checkAuth from "./middleware/checkAuth.js";

const app = express()

app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}))
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/admin', checkAuth, adminRoutes)
app.use('/api/user', checkAuth, userRoutes)
app.use('/api/projects',  projectsRoutes)

mongoose.connect(process.env.DB_URI)
    .then(app.listen(3000, () => {
        console.log('server running in port 3k')
    }))