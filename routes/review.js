const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js")
const {validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js");
const reviewController= require("../controller/review.js");


//validate review


//Reviews Post route
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.postReview));

//Delete Post review Route

router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.deleteReview))

module.exports= router;