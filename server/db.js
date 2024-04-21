const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/philly-codefest");

const userSchema = new mongoose.Schema({
    name: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    phone: { type: Number, default: null },
    date: {
        type: Date,
        default: Date.now
    },
    location: { type: String, default: null },
    markers: { type: Array, default: [] },
    count: { type: Array, default: [] },
    landType: { type: String, default: null },
})

module.exports = mongoose.model("users", userSchema);
  