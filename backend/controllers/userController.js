const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  // Hash the password, need to generate a salt to hash the password by calling a bcrypt method called gensalt()
 const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)  // along with user data that we pass back, also pass back a token which is called generateToken and pass in user._id, so the user that we register just passing the id into the generate token function, do the same thing for login
    })
  } else {
    res.status(400)
    throw new Error('invalid user data')
  }
 // res.json({message: 'Register User'})
})

// @ desc Authenticate a user for login
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler (async (req,res) => {
  const{email, password} = req.body
  // check for user email
  const user = await User.findOne({email})
  if (user && ( await bcrypt.compare(password, user.password)))
  {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })    
  }  else {
    res.status(400)
    throw new Error('invalid credentials')
  }
})

// @ desc Get user data
// @route GET /api/users/me
// @access private
const getMe = asyncHandler (async (req,res) => {
  res.json({message: 'Display User Data'})
})

//Generate JWT token, takes user's id as the payload 
//this will sign a new token with the id thats passed in, with this secret used, and expire in 30 days
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}