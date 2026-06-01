const express = require("express");
const router = express.Router({ mergeParams: true }); // 🔥 VERY IMPORTANT

const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");

// VALIDATION
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    let msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, msg);
  }
  next();
};

// CREATE REVIEW
router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {

    const { id } = req.params;   // listing id comes from URL

    const listing = await Listing.findById(id);

    const review = new Review(req.body.review);

    listing.reviews.push(review);

    await review.save();
    await listing.save();

    res.redirect(`/listings/${id}`);
  })
);

// DELETE REVIEW
router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {

    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId }
    });

    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;