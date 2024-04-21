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
    location: {
        locationName: { type: String, default: 'Belém do Candeia' },
        latitude: { type: Number, default: -3.5146957460989574 }, // replace with your latitude
        longitude: { type: Number, default: -62.46641126710576 } // replace with your longitude
    },
    markers: { type: Array, default: [] },
    count: { type: Number, default: 0 },
    landType: { type: String, default: null },
    cause: { type: String, default:null},
})

module.exports = mongoose.model("users", userSchema);
  