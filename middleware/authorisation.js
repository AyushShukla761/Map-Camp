const Campground =require('../models/campground')
const reviews =require('../models/reviews')

const isauthor= async (req,res,next) =>{
    const { id } = req.params;
    const campground = await Campground.findById(id);
    console.log(campground.creator)
    console.log(req.user._id)

    if (!campground.creator.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

const israuthor = async (req, res, next) => {
    const { id, rid } = req.params;
    const review = await reviews.findById(rid);
    
    if (!review.user.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports= israuthor
module.exports= isauthor