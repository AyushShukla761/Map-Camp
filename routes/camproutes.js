const express = require('express')
const router =express.Router()
const Campground =require('../models/campground')
const ExpressError= require('../utilities/expressError')
const errhandler= require('../utilities/errhandler')
const Joi = require('joi');
const flash=require('connect-flash')
const islogged= require('../utilities/checklogin')
const isauthor = require('../middleware/authorisation')

// joi schema
const Campschema=require('../utilities/schemaerr')  

router.get('/', errhandler(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}))

router.get('/new',islogged, (req, res) => {
    res.render('campgrounds/new');
})

router.post('/',islogged,isauthor, errhandler(async (req, res) => {
    const camp=req.body
    const {error}=Campschema.validate(camp)
    if(error){
        const msg=error.error.details[0].message;
        
        throw new ExpressError(msg,404)
        
    }
    const campground = new Campground(req.body.campground);
    campground.creator=req.user._id;
    await campground.save();
    await req.flash('success', 'Successfully made a new campground!');

    res.redirect(`/campgrounds/${campground._id}`)
}))

router.get('/:id', errhandler(async (req, res,) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'user'
        }}).populate('creator')
        console.log(campground.reviews)
    
    res.render('campgrounds/show', { campground });
}));

router.get('/:id/edit',islogged, errhandler(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground });
}))


router.put('/:id',islogged,isauthor, errhandler(async (req, res) => {
    const { id } = req.params;
    
    const campground = await Campground.findByIdAndUpdate(id, req.body.campground);
    
    res.redirect(`/campgrounds/${campground._id}`)
}));

router.delete('/:id',islogged,isauthor, errhandler(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}))


module.exports= router;