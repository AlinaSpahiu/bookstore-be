const express = require('express')
const {protect} = require('../middleware/authMiddleware')
const {authUser, getAllUsers, getUserById, getUserProfile, registerUser, updateUserProfile} = require('../controllers/userController')


const router = express.Router()


// 1. GET all users:
//    GET: /api/users
router.get('/', getAllUsers)


// 2. GET only one User by ID:
//    GET: /api/users/:id
router.get('/:id', getUserById)


// 3. Log-in an existent user:
//    POST: /api/users/login
router.post('/login', authUser)


// 4. Register a new User
//    POST: /api/users/
router.post('/', registerUser)


// 5. GET USER PROFILE:
//    GET: /api/users/profile
router.get('/profile', protect, getUserProfile)

// 6. UPDATE USER PROFILE:
// //    PUT: /api/users/profile
// router.put('/profile', protect, updateUserProfile)

router.route('/profile').get(protect, getUserProfile)


module.exports = router

