const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Listing = require("./models/listing.js");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema}=require("./schema.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// ========================
// DB CONNECTION
// ========================
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));



// ========================
// MIDDLEWARE
// ========================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


const validateListing=(req,res,next)=>{
  let {error}= listingSchema.validate(req.body);
    if(error){
      let errMsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400, errMsg );
    }else{
      next();
    }
}
// ========================
// ROOT
// ========================
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// ========================
// LISTING ROUTES
// ========================

// INDEX
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  })
);

// NEW
app.get("/listings/new", (req, res) => {
  res.render("listings/new");
});

// CREATE
app.post(
  "/listings",validateListing,
  wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  })
);

// SHOW
app.get(
  "/listings/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      return next(new ExpressError(404, "Listing not found"));
    }

    res.render("listings/show", { listing });
  })
);

// EDIT
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      return next(new ExpressError(404, "Listing not found"));
    }

    res.render("listings/edit", { listing });
  })
);

// UPDATE
app.put(
  "/listings/:id",validateListing,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  })
);

// DELETE
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndDelete(id);

    res.redirect("/listings");
  })
);

// ========================
// 404 ROUTE
// ========================
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// ========================
// ERROR HANDLER
// ========================
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;

  res.status(statusCode).render("listings/error", { message });
});

// ========================
// SERVER
// ========================
app.listen(8080, () => {
  console.log("Server running on port 8080");
});
