const Listing=require("../models/listing")
module.exports.index = async (req, res) => {
    const { category, search } = req.query;

    let filter = {};
    if (category) {
        filter.category = category; 
    }
    if (search) {
        filter.title = new RegExp(search, "i"); // Case-insensitive search
    }

    const allListings = await Listing.find(filter);
    res.render("listings/index.ejs", { allListings, category, search });
};


module.exports.renderNewForm= (req, res) => {

    res.render("listings/new.ejs");
}

module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({path:"reviews",populate:{path:"author"}})
    .populate("Owner");
    if (!listing) {
        req.flash("error", "Listing You Are Requested Does Not Exist !!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    console.log("Image URL:", url);
    console.log("Filename:", filename);

    const newListing = new Listing(req.body.listing);
    newListing.Owner = req.user._id;
    newListing.image = { url, filename }; // ✅ Save as an object

    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
};



module.exports.editlisting=async (req, res) => {
    
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing You Are Requested Does Not Exist !!");
        res.redirect("/listings");
    }
   let originalImageUrl= listing.image.url;
  originalImageUrl= originalImageUrl.replace("/upload","/upload/h_200,w_250");
    res.render("listings/edit.ejs", { listing,originalImageUrl })
}

module.exports.updatelisting=async (req, res) => {
    
    let { id } = req.params;
    let listing =await Listing.findByIdAndUpdate(id, { ...req.body.listing });
if(typeof req.file!="undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image={url,filename};
    await listing.save();
}
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
}

module.exports.deletelisting=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");

}