const mongoose = require("mongoose");

const Availability = require("../models/availabilityModel");

const getAllAvailabilities = async (req, res) => {
  const availability = await Availability.find({});
  res.status(200).json(availability);
};

// GET AVAILABILITY BY NURSERY's ID
const getAvailabilityById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such availability" });
  }
  const availability = await Availability.find({ nursery_id: id }).populate(
    "nursery_id"
  );

  if (!availability) {
    return res.status(404).json({ error: "No such availability" });
  }

  return res.status(200).json(availability);
};

// GET AVAILABILITY BY ID
const getSingleAvailability = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such availability" });
  }
  const availability = await Availability.findById(id).populate("nursery_id");

  if (!availability) {
    return res.status(404).json({ error: "No such availability" });
  }

  return res.status(200).json(availability);
};

// CREATE AVAILABILITY
const createAvailability = async (req, res) => {
  const { nursery_id, day } = req.body;

  try {
    const availability = await Availability.create({
      nursery_id,
      day,
    });
    res.status(200).json(availability);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE AVAILABILITY
const updateAvailability = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such availability" });
  }

  try {
    const availability = await Availability.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!availability) {
      return res.status(400).json({ error: "No such availability" });
    }

    // Update isFull based on place_booked and place_max
    if (availability.place_booked === availability.place_max) {
      availability.isFull = true;
    } else {
      availability.isFull = false;
    }

    await availability.save();

    return res.status(200).json(availability);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

async function deletePastAvailabilities() {
  try {
    await Availability.deletePastAvailabilities();
    console.info("Past availabilities deleted successfully.");
  } catch (error) {
    console.error("Error deleting past availabilities:", error.message);
  }
}

// Call the function to delete past availabilities
deletePastAvailabilities();

module.exports = {
  getAllAvailabilities,
  getAvailabilityById,
  createAvailability,
  updateAvailability,
  getSingleAvailability,
};
