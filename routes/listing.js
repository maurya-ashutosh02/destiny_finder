const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js")
const { isLoggedIn,isOwner,validateListing } = require("../middleware.js");
const listingController=require("../controller/listing.js");
const multer  = require('multer')
const{storage}=require("../cloudConfig.js");
const upload = multer({storage});


router.route("/")
.get(wrapAsync(listingController.index))
.post( isLoggedIn,upload.single('listing[image]'),validateListing, wrapAsync(listingController.createListing));



//new route
router.get("/new", isLoggedIn,listingController.renderNewForm);

router.route("/:id").get( wrapAsync(listingController.showListing))
.put(  isLoggedIn,isOwner,upload.single('listing[image]'),validateListing, wrapAsync(listingController.updatelisting))
.delete( isLoggedIn,isOwner, wrapAsync(listingController.deletelisting));



//edit Route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.editlisting));

// Route to show all listings
router.get("/", async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index", { listings, category: null }); // Pass category as null for default view
});
// Route to filter listings by category
router.get("/category/:category", async (req, res) => {
    const { category } = req.params;
    const listings = await Listing.find({ category });
    res.render("listings/index", { listings,category });
});
module.exports = router;

