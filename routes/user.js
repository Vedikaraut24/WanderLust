const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport");
// ========================
// SHOW SIGNUP FORM
// ========================
router.get("/signup", (req, res) => {
  res.render("users/signup");
});

// ========================
// SIGNUP POST ROUTE
// ========================
router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const newUser = new User({ email, username });

      const registeredUser = await User.register(newUser, password);

      console.log(registeredUser);

      req.flash("success", "Welcome to WanderLust!");
      res.redirect("/listings");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  })
);

// ========================
// SHOW LOGIN FORM
// ========================
router.get("/login", (req, res) => {
  res.render("users/login");
});
router.post("/login",passport.authenticate("local",{
    failureRedirect:"/login" ,
    failureFlash: true
}),
async(req,res)=>{
    req.flash("success","Welcome back to WanderLust!");
    res.redirect("/listings");
});
module.exports = router;