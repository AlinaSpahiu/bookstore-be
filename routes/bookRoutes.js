const express = require('express')
const {getBooks, getBookById} = require('../controllers/bookControllers')

const router = express.Router()

// 1. Get all Books
router.get('/', getBooks)

//2. Get only one Book by ID
router.get('/:id', getBookById)

module.exports = router