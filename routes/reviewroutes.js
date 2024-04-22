const express = require('express')
const router =express.Router({ mergeParams: true })
const Campground =require('../models/campground')
const reviews =require('../models/reviews')
const ExpressError= require('../utilities/expressError')
const errhandler= require('../utilities/errhandler')
const islogged = require('../utilities/checklogin')
const israuthor = require('../middleware/authorisation')



// joi schema
const Campschema=require('../utilities/schemaerr')  

router.post('/',islogged, errhandler(async (req,res)=>{
    const {review} =req.body;
    const id= req.params.id;
    const camp= await Campground.findById(id);
    const r= await new reviews(review);
    r.user=req.user._id;
    await camp.reviews.push(r);
    await r.save();
    await camp.save();
    res.redirect(`/campgrounds/${camp._id}`)
}))



router.delete('/:reviewid',islogged,israuthor, errhandler(async (req, res) => {
    const { id, reviewid } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await reviews.findByIdAndDelete(reviewid);
    res.redirect(`/campgrounds/${id}`);
}))




module.exports= router