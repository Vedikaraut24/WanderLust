const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({}); // clear old data

  const modifiedData = initData.data.map((obj) => ({
    ...obj,
  }));

  await Listing.insertMany(modifiedData);

  console.log("Data initialized successfully");
};

initDB();