const express=require("express");
const router=express.Router({mergeParams:true});
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userContoller= require("../controller/user.js");

router.route("/signup").get(userContoller.renderSignupForm)
.post(wrapAsync(userContoller.signup));

router.route("/login").get(userContoller.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),
userContoller.signIn);




router.get("/logout", userContoller.logOut);

module.exports=router;