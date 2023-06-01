import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../Models/userModel.js'
class UserService {

   pt=0;
  constructor() {

  }

  hashPassword = async (password) => {
    try {
      let saltRounds = 10
      let hash = await bcrypt.genSalt(saltRounds)
      let hashedPassword = await bcrypt.hash(password, hash)
      return hashedPassword
    } catch (e) {
      console.log(e)
    }
  }

  validatePassword = async (password, hash) => {
    try {
      let isPasswordCorrect = await bcrypt.compare(password, hash)
      console.log(isPasswordCorrect)
      return isPasswordCorrect ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  generateToken = async (user, email) => {
    console.log(user);
    const token = await jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: '2h',
      },
    )
    console.log(token)
    return token
  }

  login = async (email, password, res) => {
    let user = await userModel.find({ email: email })
    if (user.length === 0) {
      res.status(404).json({
        status: 'failure',
        message: 'User Not Found',
      })
    }

    let checkPassword = await this.validatePassword(password, user[0].password)
    if (checkPassword) {
    let token = await this.generateToken(user[0], user[0].email);
      let userObj = {
        name: user[0].name,
        email: user[0].email,
        password: user[0].password,
        image: user[0].image,
        token,
        
      }
      return userObj;
    } else {
      res.status(400).json({
        status: 'failure',
        message: 'Incorrect Password',
      })
    }
  }

  createUser = async (name, email, password, image) => {
  
    let user = await userModel.create({
      name,
      email,
      password,
      image,
    })

    return user
  }
}

export default UserService
