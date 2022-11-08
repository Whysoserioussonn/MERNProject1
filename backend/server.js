const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config() 
const {errorHandler} =require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()


//add middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// we have our api goals going to our goalRoutes
app.use('/api/goals', require('./routes/goalRoutes'))

// we have our api users going to our userRoutes
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)


app.listen(port, () => console.log(`Server started on port ${port}`))