const asyncHandler = require('express-async-handler')
const Book = require('../models/bookModel')


// 1. Get all Books
// 
const getBooks = asyncHandler(async(req, res) => {
    const books = await Book.find({})
    res.json(books)
})


// 2. Get only one Book by ID
//
const getBookById = asyncHandler(async(req, res) => {
    const book = await Book.findById(req.params.id)

    if(book) {
          res.json(book)
       } else {res.status(404)
           throw new Error ('Book not found!')
    }
})

module.exports = {getBooks, getBookById}