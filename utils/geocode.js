const fetch = require("node-fetch");

module.exports.geocode = async (location, country) => {
  const query = `${location}, ${country}`;

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data || data.length === 0) {
    throw new Error("Location not found");
  }

  return {
    lat: data[0].lat,
    lng: data[0].lon,
  };
};