const express = require('express')
const router =express.Router()
const Campground =require('../models/campground')
const ExpressError= require('../utilities/expressError')
const errhandler= require('../utilities/errhandler')
const Joi = require('joi');
const flash=require('connect-flash')
const passport= require('passport')
const users= require('../models/users');



router.get('/register',errhandler(async(req,res)=> {

    res.render('campgrounds/register');
}))

router.post('/register',errhandler(async(req,res,next)=> {
    
    try{
        const {email, password, username} = req.body;
        const user= new users({email,username});
        const reusr=await users.register(user, password);
        req.login(reusr, err=>{
            if (err) return next(err)

            req.flash('success','Welcome!')
            res.redirect('/campgrounds');

        })
    }

    catch(er){
        req.flash('error', er.message);
        res.redirect('/register');
    }
}))

router.get('/login', (req, res) => {
    res.render('campgrounds/login');
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'You are logged in.');
    
    res.redirect('/campgrounds');
})

router.get('/logout',(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
            
        }
        req.flash('success','See you again!')
        res.redirect('/campgrounds')
    })
})

module.exports = router;