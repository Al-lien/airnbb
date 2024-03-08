const express = require("express");

const router = express.Router();
const {
  getAllAvailabilities,
  getAvailabilityById,
  createAvailability,
  updateAvailability,
  getSingleAvailability,
} = require("../controllers/availabilityController");

// GET ALL data
router.get("/", getAllAvailabilities);

// GET AVAILABILITIES BY NURSERY ID
router.get("/:id", getAvailabilityById);

// GET AVAILABILITY BY ID
router.get("/single/:id", getSingleAvailability);

// CREATE data
router.post("/", createAvailability);

// UPDATE data
router.patch("/:id", updateAvailability);

module.exports = router;
