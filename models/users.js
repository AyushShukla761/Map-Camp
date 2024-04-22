const mongoose= require("mongoose");
const schema= mongoose.Schema;
const passportlocalmongoose = require('passport-local-mongoose');


const userschema = new schema({

    username:{
        type:String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    }
})

userschema.plugin(passportlocalmongoose);

module.exports = mongoose.model('User', userschema);




