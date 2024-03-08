const mongoose = require("mongoose");

const { Schema } = mongoose;

const nurserySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    city: { type: String, required: true },
    number: { type: Number, required: true },
    street: { type: String, required: true },
    postcode: { type: Number, required: true },
  },
  place_max: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Nursery", nurserySchema);
