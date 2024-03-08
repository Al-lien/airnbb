const express = require("express");

const router = express.Router();
const {
  getAllBookings,
  getBookingById,
  createBooking,
  getBookingByParentId,
  deleteBooking,
} = require("../controllers/bookingController");

// GET ALL BOOKINGS
router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.get("/parent/:id", getBookingByParentId);
router.post("/", createBooking);
router.delete("/:id", deleteBooking);

module.exports = router;
