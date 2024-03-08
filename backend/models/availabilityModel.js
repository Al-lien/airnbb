const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  nursery_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nursery",
    required: true,
    validate: {
      async validator(value) {
        // Vérifier si le nursery_id existe dans la collection "parent"
        const nursery = await mongoose.model("Nursery").findById(value);
        if (nursery === null) {
          return false;
        }
        return true;
      },
      message: "Nursery with this ID does not exist.",
    },
  },
  isFull: {
    type: Boolean,
    default: "false",
    required: true,
  },
  place_max: {
    type: Number,
    default: 0, // Set a default value, it will be overridden below
    required: true,
  },
  day: {
    type: Date,
    required: true,
  },
  place_booked: {
    type: Number,
    default: 0,
    required: true,
  },
});

// Pre-save hook to check if the date is in the past and prevent the save
availabilitySchema.pre("save", function checkDate(next) {
  const currentDate = new Date();
  if (this.day < currentDate) {
    // If the date is in the past, prevent the save
    return next(new Error("Cannot save availability with a past date."));
  }
  return next();
});

// Static method to delete past availabilities
availabilitySchema.statics.deletePastAvailabilities =
  async function deletingPastAvailabilities() {
    const currentDate = new Date();
    const pastAvailabilities = await this.find(
      { day: { $lt: currentDate } },
      { _id: 1 }
    );
    // delete bookings linked to those pastAvailabilities
    await mongoose.model("Booking").deleteMany({
      availability_id: { $in: pastAvailabilities },
    });
    // Delete documents with 'day' field less than the current date
    // &lt = less than
    await this.deleteMany({ day: { $lt: currentDate } });
  };

// set place_max according to nursery_id
availabilitySchema.pre("save", async function setPlaceMax(next) {
  if (!this.place_max) {
    const nursery = await mongoose.model("Nursery").findById(this.nursery_id);
    if (nursery) {
      this.place_max = nursery.place_max;
    }
  }
  next();
});

// set if availability is full if place_booked === nursery place_max
availabilitySchema.pre("save", function setIsFull(next) {
  if (this.place_booked === this.place_max) {
    this.isFull = true;
  } else {
    this.isFull = false;
  }
  next();
});

const Availability = mongoose.model("Availability", availabilitySchema);
module.exports = Availability;
