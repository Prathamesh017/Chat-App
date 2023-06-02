import express from 'express'
import colors from 'colors'
import * as dotenv from 'dotenv'
import userRouter from './Router/userRouter.js'
import connectDB from './Config/db.js'
import verifyToken from './Middleware/middleware.js'
import cors from 'cors'
import cloudinary from 'cloudinary'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

cloudinary.v2.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME,
})
app.use(express.json())
app.use(cors())
await connectDB()
app.use('/api/user', userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`.yellow)
})
