const express = require('express')
const dotenv = require('dotenv')
const cors = require("cors")
const connectDB = require('./config/db')
const{ notFound, errorHandler} = require('./middleware/errorMiddleware')
const bookRoutes = require('./routes/bookRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')


dotenv.config()
connectDB()
const server = express()
server.use(cors())
server.use(express.json())

// Routes
server.use('/api/books', bookRoutes)
server.use("/api/users", userRoutes)
server.use("/api/orders", orderRoutes)

server.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// MiddleWares:
server.use(notFound)

server.use(errorHandler)

const PORT = process.env.PORT || 5000

server.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))