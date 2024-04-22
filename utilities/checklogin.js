islogged=  (req, res, next) =>{
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be loged in first!');
        
        return res.redirect('/login');
    }
    
    next();

}

module.exports= islogged;