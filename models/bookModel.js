const mongoose = require('mongoose');

// ```
// Reviews Schema
const reviewSchema = mongoose.Schema({
    name: {type:String, required: true},
    rating: {type:Number, required: true},
    comment: {type:String, required: true}

}, {
    timestamps: true,
})

//```
// Books Schema
const bookSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, 
    author: {type:String, required: true},
    title: {type: String, required: true},
    image: {type:String, require: true},
    description: {type:String, require: true},
    category: {type:String, require: true},
    price: {type:Number, require: true, default: 0},
    countInStock: {type:Number, require: true, default: 0},
    reviews: [reviewSchema],
    rating: {type:Number, require: true, default: 0},
    numReviews: {type:Number, require: true, default: 0},
   
}, {
    timestamps: true
})

const Book = mongoose.model('Book', bookSchema)
module.exports = Book

//  {
//   "author":"Erich Maria Remarque",
//   "title":"Spark of life",
// "image": "...",
// "description": "...",
// "category":"dram",
// "price": 10.30,
// "countInStock":5,
// "reviews":[],
// "rating":"3",
// "numReviews":4

// }