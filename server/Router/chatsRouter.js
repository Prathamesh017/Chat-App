import express from 'express'
import { createChat, getAllChats } from '../Controller/chatController.js'
import verifyToken from '../Middleware/middleware.js'
const chatsRouter = express.Router()

chatsRouter
  .post('/', verifyToken, createChat)
  .get('/', verifyToken, getAllChats)

export default chatsRouter
