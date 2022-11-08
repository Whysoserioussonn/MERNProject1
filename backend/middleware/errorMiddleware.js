// all middleware is functions that execute during the request /response cycle

const { restart } = require("nodemon")

// function to overwrite the default Express error Handler, pass in err, then request response, then next to call on any further middleware
const errorHandler = (err, req, res, next) => {
  // variable statuscode set to terinary if res.StatusCode meaning what is set in the controller, then put that, otherwise statuscode 500 server error
  const statusCode = res.statusCode ? res.statusCode : 500

  res.status(statusCode) // pass in statuscode whether is it what is set or 500

  // then respond with json, .json will pass in a message and then on that error object we have a message text
  // and can also get the stack trace that can give additional info but only if we are in development mode
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })

}

module.exports = {
  errorHandler
}