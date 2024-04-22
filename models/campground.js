const mongoose= require("mongoose");
const reviews = require('../models/reviews')
const users = require('../models/users')


const Campschema= new mongoose.Schema({
    title: {
        type: String,
    
    },
    image: String,
    price: {
        type: Number,
        min: 0
    },
    description:{
        type: String,
        
    },
    location:{
        type: String,
        
    },
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews",
    }],

    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

Campschema.post('findOneAndDelete',async (re) =>{
    if(re){
        await reviews.deleteMany({
            _id: {
                $in: re.reviews
            }
        })
    }
})

const Campground= new mongoose.model('Campground',Campschema)

module.exports = Campground;