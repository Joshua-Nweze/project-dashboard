import express from "express";
import bodyParser from 'body-parser'
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import cors from 'cors'
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken'

import authRoutes from './routes/auth.routes.js'
import adminRoutes from './routes/admin.routes.js'
import userRoutes from './routes/user.routes.js'
import projectsRoutes from './routes/projects.routes.js'
import setupRoutes from './routes/setup.routes.js'

import checkAuth from "./middleware/checkAuth.js";

const app = express()

const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ['http://localhost:8080', 'https://pdashboardd.netlify.app'],
    credentials: true
}))

app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/setup', setupRoutes)
app.use('/api/user', checkAuth, userRoutes)
app.use('/api/projects', projectsRoutes)

// validate token

app.post('/api/validate-token', checkAuth, (req, res) => {
	return res.status(200).json({ valid: true })
})

mongoose.connect(process.env.DB_URI)
    .then(app.listen(PORT, () => {
        console.log(`server running in port ${PORT}`)
    }))