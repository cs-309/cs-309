const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    // image: {
    //     type: String,
    //     required: true,
    //   },
    //   video: {
    //     type: String,
    //     required: true,
    //   },
  }, 
  { timestamps: true }//created at, updated at
  );


module.exports = Book = mongoose.model('book', bookSchema);