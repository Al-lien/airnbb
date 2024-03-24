const mongoose = require("mongoose");

const Nursery = require("../models/nurseryModel");

// GET ALL nurseries
const getAllNurseries = async (req, res) => {
  const nurseries = await Nursery.find({});

  res.status(200).json(nurseries);
};

// GET SINGLE nursery
const getNurseryById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such nursery" });
  }
  const nursery = await Nursery.findById(id);

  if (!nursery) {
    return res.status(404).json({ error: "No such nursery" });
  }

  return res.status(200).json(nursery);
};

// CREATE nursery
const createNursery = async (req, res) => {
  const { name, address, place_max } = req.body;

  try {
    const nursery = await Nursery.create({
      name,
      address: {
        city: address.city,
        number: address.number,
        street: address.street,
        postcode: address.postcode,
      },
      place_max,
    });
    res.status(201).json(nursery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE nursery
const updateNursery = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such nursery" });
  }

  const nursery = await Nursery.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!nursery) {
    return res.status(400).json({ error: "No such nursery" });
  }

  return res.status(200).json(nursery);
};

// DELETE user
const deleteNursery = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such nursery" });
  }

  const nursery = await Nursery.findOneAndDelete({ _id: id });

  if (!nursery) {
    return res.status(404).json({ error: "No such nursery" });
  }

  return res.status(200).json({ message: `nursery ${id} deleted` });
};

module.exports = {
  getAllNurseries,
  getNurseryById,
  createNursery,
  updateNursery,
  deleteNursery,
};
