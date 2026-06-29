const Listing = require("../models/listing");
const axios = require("axios");
const { geocode } = require("../utils/geocode");


// INDEX + SEARCH
module.exports.index = async (req, res) => {
  let { search } = req.query;

  let allListings;

  if (search && search.trim() !== "") {
    allListings = await Listing.find({
      $or: [
        { title: { $regex: search.trim(), $options: "i" } },
        { location: { $regex: search.trim(), $options: "i" } },
        { country: { $regex: search.trim(), $options: "i" } },
      ],
    });
  } else {
    allListings = await Listing.find({});
  }

  res.render("listings/index", { allListings, search });
};

// NEW FORM
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};


// CREATE
module.exports.createListing = async (req, res) => {
  const listing = new Listing(req.body.listing);

  listing.owner = req.user._id;

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  // ✅ FREE GEOCODING (NO CREDIT CARD)
  const query = `${listing.location}, ${listing.country}`;

  const geoResponse = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
  );

  const geoData = await geoResponse.json();

  if (geoData.length > 0) {
    listing.geometry = {
      type: "Point",
      coordinates: [
        parseFloat(geoData[0].lon),
        parseFloat(geoData[0].lat),
      ],
    };
  }

  await listing.save();

  req.flash("success", "Listing created!");
  res.redirect("/listings");
};

// SHOW
module.exports.showListing = async (req, res) => {
  let listing = await Listing.findById(req.params.id)
    .populate("owner")   // 🔥 THIS IS REQUIRED
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    });
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  res.render("listings/show", { listing });
};

// EDIT
module.exports.renderEditForm = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
  res.render("listings/edit", { listing ,originalImageUrl});
};

// UPDATE
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true }
  );

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };

    await listing.save();
  }

  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${id}`);
};

// DELETE
module.exports.destroyListing = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);

  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};


