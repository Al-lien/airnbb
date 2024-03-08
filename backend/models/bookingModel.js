const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  availability_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Availability",
    required: true,
    validate: {
      async validator(value) {
        const availability = await mongoose
          .model("Availability")
          .findById(value);
        if (availability === null) {
          return false;
        }
        return true;
      },
      message: "Availability with this ID does not exist.",
    },
  },
  child_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Child",
    required: true,
    validate: {
      async validator(value) {
        const child = await mongoose.model("Child").findById(value);
        if (child === null) {
          return false;
        }
        return true;
      },
      message: "Child with this ID does not exist.",
    },
  },
});

bookingSchema.statics.makeReservation = async function makingreservation(
  availability_id,
  child_id
) {
  const availability = await mongoose
    .model("Availability")
    .findById(availability_id);

  if (availability && availability.isFull === false) {
    availability.place_booked += 1;
    await availability.save();
  } else {
    throw new Error("Availability with this ID does not exist.");
  }

  const booking = await this.create({
    availability_id,
    child_id,
  });

  return booking;
};

bookingSchema.statics.deleteReservation = async function deletingreservation(
  booking_id
) {
  const availability = await this.findById(booking_id).populate(
    "availability_id"
  );

  if (availability.availability_id) {
    availability.availability_id.place_booked -= 1;
    await availability.availability_id.save();
  } else {
    throw new Error("Availability with this ID does not exist.");
  }

  const booking = await this.findOneAndDelete({ _id: booking_id });

  return booking;
};

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
