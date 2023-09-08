import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'

dotenv.config()
import Connection from './database/db.js'
import router from './router/router.js'

const PORT = process.env.PORT || 8000
const app = express()
Connection()

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/',router)

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`))
