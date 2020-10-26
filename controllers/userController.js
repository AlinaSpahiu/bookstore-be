const asyncHandler = require("express-async-handler")
const {generateToken} = require('../utils/generateToken')
const User = require("../models/userModel")


// @desc Auth user & get token
// @route POST /api/user/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

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
  

//
// Gets the loggedIn user:
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
    throw new Error('User not found')
  }
})

// ~~~
// Update User Profile: 
// PUT /api/users/profile
// ~~~
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
   user.name = req.body.name || user.name
   user.surname = req.body.surname || user.surname
   user.email = req.body.email || user.email
   if(req.body.password){
     user.password = req.body.password
   }

   const updatedUser = await user.save()

   res.json({
     _id: updatedUser._id,
     name: updatedUser.name,
     surname: updatedUser.surname,
     email: updatedUser.email,
     isAdmin: updatedUser.isAdmin,
     token: generateToken(updatedUser._id),
   })

  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//
//
// Register a new User
const registerUser = asyncHandler(async (req, res) => {
    const { name, surname, email, password } = req.body
  
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
  
    const user = await User.create({
      name,
      surname,
      email,
      password,
    })
  
    if (user) {
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
      throw new Error('Invalid user data')
    }
  })


//
// Gets all users by ADMIN
const getUsersbyAdmin = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)

})

// Delete user by ADMIN
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if(user){
    await user.remove()
    res.json({message: "User Deleted"})
  } else{
    res.status(404)
    throw new Error('User not found')
  }
  res.json(users)

})

// Gets one user by Id by ADMIN
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if(user){
    res.json(user)

  } else {
    res.status(404)
    throw new Error('User not found')
  }
 
})

// Update user by Admin
const updateUserByAdmin = asyncHandler(async(req, res)=> {
  const user = await User.findById(req.user._id)

  if(user){
    user.name = req.body.name || user.name
    user.surname = req.body.surname || user.surname
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin || user.isAdmin

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      surname: updatedUser.surname,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})





module.exports = {authUser, getUserProfile, registerUser, updateUserProfile, getUsersbyAdmin, deleteUser, getUserById, updateUserByAdmin}