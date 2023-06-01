import express from 'express'
import { loginUser,registerUser,getUser} from '../Controller/userController.js'
const userRouter = express.Router();

userRouter.get("/",getUser).post('/login', loginUser).post('/register', registerUser);
export default userRouter;
