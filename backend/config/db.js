//file used to connect to mongodb and going to use Mongoose 

const mongoose = require('mongoose')

// create arrow function connectDB that is asynchronous b/c all Mongoose methods are async
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch(error){
    console.log(error);
    process.exit(1)   // exit process with failure so add a (1)
  }
}

module.exports = connectDB  // bring into server.js and run it