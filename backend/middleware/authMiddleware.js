const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token
// checking for the authorization header, make sure its a Bearer token
// then assigning token that we are decoding and verifying token to the variable decoded
// then we are getting the user from the token calling the next piece of middleware
// if token doesnt exist, we going to throw a 401 not authorize
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      next()  //because at the end of the middle we want to call the next piece of middleware through next()
    } catch (error) {
      console.log(error)
      res.status(401)  // (401) means not authorized
      throw new Error('Not authorized')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }  // export to import at userRoutes