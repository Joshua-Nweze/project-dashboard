import express from "express";
import bodyParser from 'body-parser'
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

import adminRoutes from './routes/admin.routes.js'
import userRoutes from './routes/user.routes.js'
import projectsRoutes from './routes/projects.routes.js'

const app = express()

app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/admin', adminRoutes)
app.use('/api/check-user', userRoutes)
app.use('/api/projects', projectsRoutes)

mongoose.connect(process.env.DB_URI)
    .then(app.listen(3000, () => {
        console.log('server running in port 3k')
    }))