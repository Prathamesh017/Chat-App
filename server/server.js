import express from 'express'
import colors from 'colors'
import * as dotenv from 'dotenv'
import userRouter from './Router/userRouter.js'
import connectDB from './Config/db.js'
import verifyToken from './Middleware/middleware.js'
import cors from "cors";

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
await connectDB()
app.use('/api/user', userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`.yellow)
})
