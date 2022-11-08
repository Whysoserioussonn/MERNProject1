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
  const salt = await bcyrpt.genSalt(10)
  const hashedPassword = await bcyrpt.hash(password, salt)

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
      email: user.email
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
      email: user.email
    })    
  }  else {
    res.status(400)
    throw new Error('invalid credentials')
  }
})

// @ desc Get user data
// @route GET /api/users/me
// @access Public
const getMe = asyncHandler (async (req,res) => {
  res.json({message: 'Display User Data'})
})

module.exports = {
  registerUser,
  loginUser,
  getMe,
}