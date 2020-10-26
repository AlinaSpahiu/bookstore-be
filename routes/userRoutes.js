const express = require('express')
const {protect} = require('../middleware/authMiddleware')
const {authUser, getAllUsers, getUserById, getUserProfile, registerUser, updateUserProfile} = require('../controllers/userController')


const router = express.Router()


// Users login: http://localhost:5002/api/user/login
router.post('/login', authUser)

// Gets User profile: http://localhost:5002/api/users/profile
router.route('/profile').get(protect, getUserProfile)

// Update User Profile:
router.route('/profile').put(protect, updateUserProfile)

// Create(POST) a new User:
router.route('/').post( registerUser)

// Delete User:
router
.route('/:id')
.get(protect,  getUserById)




module.exports = router

