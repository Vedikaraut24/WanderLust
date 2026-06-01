const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn } = require("../middleware.js");

// VALIDATION
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error.details[0].message);
  }
  next();
};

// INDEX
router.get(
  "/",
  wrapAsync(async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  })
);

// NEW
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

// CREATE
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();

    req.flash("success", "Listing created!");
    res.redirect("/listings");
  })
);

// SHOW
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id).populate("reviews");

    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    res.render("listings/show", { listing });
  })
);

// EDIT (✔️ FIXED - THIS WAS MISSING)
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);

    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    res.render("listings/edit", { listing });
  })
);

// UPDATE
router.put(
  "/:id",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    await Listing.findByIdAndUpdate(req.params.id, req.body.listing);

    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${req.params.id}`);
  })
);

// DELETE
router.delete(
  "/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);

    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
  })
);

module.exports = router;