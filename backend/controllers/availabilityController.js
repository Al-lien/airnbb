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
    res.status(201).json(availability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAvailability = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such booking" });
  }

  const availability = await Availability.findOneAndDelete({ _id: id });

  if (!availability) {
    return res.status(404).json({ error: "No such availability" });
  }

  return res.status(200).json({ message: `availability ${id} deleted` });
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
      return res.status(404).json({ error: "No such availability" });
    }

    // Update isFull based on availability.place_booked and nursery.place_max
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

deletePastAvailabilities();

module.exports = {
  getAllAvailabilities,
  getAvailabilityById,
  createAvailability,
  updateAvailability,
  getSingleAvailability,
  deleteAvailability,
};
