const mongoose = require("mongoose");

const Booking = require("../models/bookingModel");

const getAllBookings = async (req, res) => {
  const booking = await Booking.find({});
  res.status(200).json(booking);
};

const getBookingById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such booking" });
  }

  const booking = await Booking.findById(id)
    .populate({ path: "child_id", populate: "parent_id" })
    .populate({ path: "availability_id", populate: "nursery_id" });

  if (!booking) {
    return res.status(404).json({ error: "No such booking" });
  }

  return res.status(200).json(booking);
};

const getBookingByParentId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such booking" });
  }

  const booking = await Booking.find({})
    .populate({
      path: "child_id",
      match: { parent_id: id },
      select: "firstname lastname",
      populate: {
        path: "parent_id",
        select: "firstname lastname",
      },
    })
    .populate({
      path: "availability_id",
      select: "day",
    });

  if (!booking) {
    return res.status(404).json({ error: "No such booking" });
  }
  return res.status(200).json(booking);
};

const createBooking = async (req, res) => {
  const { availability_id, child_id } = req.body;

  try {
    const booking = await Booking.makeReservation(availability_id, child_id);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBooking = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such booking" });
  }

  const booking = await Booking.deleteReservation(id);

  if (!booking) {
    return res.status(404).json({ error: "No such booking" });
  }

  return res.status(200).json({ message: `booking ${id} deleted` });
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  getBookingByParentId,
  deleteBooking,
};
