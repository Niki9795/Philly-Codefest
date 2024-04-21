const express = require('express')
const cors = require('cors');
require("./db.js")

const app = express()
const User = require("./db.js")

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password
  res.send(result);
})

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
  if (user) {
    res.send(user);
  } else {
    res.send({result:"No User Found"})
  }
} else {
  res.send({result:"No User Found"})
}
})

app.get("/location", async (req, res) => {
  // Fetch user data from the database
  const user = await User.findOne({}); // Add a condition here if needed

  if (!user || !user.location) {
    res.status(404).send({ error: "No user or location found" });
    return;
  }

  // Split the location string into longitude and latitude
  const [longitude, latitude] = user.location.split(',');

  // Send the longitude and latitude as a response
  res.send({
    longitude: parseFloat(longitude),
    latitude: parseFloat(latitude)
  });
});

app.get("/markers", async (req, res) => {
  // Fetch user data from the database
  const user = await User.findOne({}); // Add a condition here if needed

  if (!user || !user.markers) {
    res.status(404).send({ error: "No user or markers found" });
    return;
  }

  // Map the markers array to an array of objects with locationName, longitude, and latitude properties
  const markers = user.markers.map(([locationName, longitude, latitude]) => ({
    locationName,
    longitude,
    latitude
  }));

  // Send the markers array as a response
  res.send(markers);
});

app.listen(8000, () => {console.log("Server started on port 8000")})
