const mongoose= require('mongoose')
const Campground =require('../models/campground')
const asyncHandler= require('express-async-handler')
const cities= require('./cities.js')
const { places, descriptors } = require('./seedshelper');

mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp')
.then(()=>{
    console.log("Mongoose Connected!!")
})
.catch(err => {
    console.log("NOT CONNECTED!!")
    console.log(err)
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = asyncHandler(async ()=>{
    await Campground.deleteMany({})
    for(let i=0; i<50;i++){
        const rand=Math.floor(Math.random()*1000)
        const price = Math.floor(Math.random() * 2000) + 1000;
        await new Campground({
            location: `${cities[rand].city}, ${cities[rand].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price: price,
            creator: '662258e458e65b51c558d86f'

        }).save()
    }
})

seedDB();