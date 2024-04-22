const mongoose= require("mongoose");
const { type } = require("../utilities/schemaerr");
const users = require('../models/users')

const reviewschema= new mongoose.Schema({
    rating: {
        type: Number,
        min:1,
        max:5
    
    },
    image: String,
    
    comment:{
        type: String,
        
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
})


const reviews= new mongoose.model('reviews',reviewschema)

module.exports = reviews;