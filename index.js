const express = require('express')
const app=express()
const path= require('path')
const methodOverride= require('method-override')
const mongoose= require('mongoose')
const ejsMate = require('ejs-mate')
const session= require('express-session');
const flash =require('connect-flash')
const localpass= require('passport-local')
const passport =require('passport')
const users= require("./models/users");
     

mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp', {});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.engine('ejs',ejsMate)


const camproutes= require('./routes/camproutes')
const reviewroute= require('./routes/reviewroutes')
const userroute= require('./routes/userroutes')


app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.use(session({
    secret:'anything',
    saveUninitialized: true,
    resave: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localpass(users.authenticate()));

passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());


app.use((req, res, next) => {
    res.locals.isuser= req.user;
    res.locals.message = req.flash();
    next();
})


app.get('/',(req,res)=>{
    res.render('home')
})


app.use('/',userroute)
app.use('/campgrounds',camproutes)
app.use('/campgrounds/:id/reviews', reviewroute )


app.use((err,req,res,next)=>{
    const{statusCode=500,message="Oops something's wrong"}= err
    res.status(statusCode).render('campgrounds/errors',{err})
})

app.listen(8080,()=>{
    console.log('Listening!!!')
})



