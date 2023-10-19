import express from "express";
import bodyParser from 'body-parser'
import { configDotenv } from "dotenv";

import adminRoutes from './routes/admin.routes.js'
import mongoose from "mongoose";

const app = express()

app.use(bodyParser.json())


app.use('/api/admin', adminRoutes)

mongoose.connect(process.env.DB_URI)
    .then(app.listen(3000, () => {
        console.log('server running in port 3k')
    }))