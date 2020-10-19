const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const{ notFound, errorHandler} = require('./middleware/errorMiddleware')
const bookRoutes = require('./routes/bookRoutes')
const userRoutes = require('./routes/userRoutes')


dotenv.config()
connectDB()
const server = express()
server.use(express.json())

// Routes
server.use('/api/books', bookRoutes)
server.use('/api/users', userRoutes)

// MiddleWares:
server.use(notFound)
server.use(errorHandler)

const PORT = process.env.PORT || 5001

server.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))