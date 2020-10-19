const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const User = require('../models/userModel')



//1. GET all users:
//   GET: /api/users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})


// 2. Get only one User by ID:
//    GET: /api/user/:id
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found!')
    }
})


// 3. Auth user && get Token
//    POST: /api/users/login
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


// 4. Register a new User
//    POST: /api/users/
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password } = req.body

    const userExists = User.findOne({ email })

    if(userExists) {
        res.status(400)
        throw new Error('User already exists!')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data!')
    }
})


// 5. GET USER PROFILE:
//    GET: /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {

        res.json({
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found!')
    }
})

module.exports = { authUser, getAllUsers, getUserById, getUserProfile, registerUser }