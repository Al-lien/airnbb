const Child = require("../models/childModel");

const getChildrenOfEveryone = async (req, res) => {
  const children = await Child.find({}).sort({ createdAt: -1 });
  res.status(200).json(children);
};

/* Get all children by users id */
const getAllChildren = async (req, res) => {
  const parentVerifiedId = req.user._id;
  try {
    const children = await Child.find({ parent_id: parentVerifiedId });
    res.status(200).json(children);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/* Get one child by his id */
const getChildById = async (req, res) => {
  const parentVerifiedId = req.user._id;
  const { id } = req.params;
  try {
    const child = await Child.findById(id);

    if (!child) {
      return res.status(404).json({ error: "Child not found" });
    }

    if (parentVerifiedId.toString() === child.parent_id.toString()) {
      return res.status(200).json(child);
    }

    return res.status(401).json({ error: "NOT YOUR CHILD" });
  } catch (error) {
    console.error("Error getting child:", error);

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/* Update a child */
const updateChild = async (req, res) => {
  const parentVerifiedId = req.user._id;
  const { id } = req.params;
  try {
    const child = await Child.findById(id);

    if (parentVerifiedId.toString() === child.parent_id.toString()) {
      const updatedChild = await Child.findByIdAndUpdate(
        { _id: id },
        { ...req.body }
      );
      return res.status(200).json(updatedChild);
    }

    if (!child) {
      return res.status(404).json({ error: "No such child" });
    }

    return res.status(401).json({ error: "NOT YOUR CHILD" });
  } catch (error) {
    return console.error("Error updating child:", error);
  }
};

/* Create new child */
const createChild = async (req, res) => {
  const {
    parent_id: parentId,
    firstname,
    lastname,
    birthday,
    walking,
    disabled,
    allergy,
  } = req.body;

  try {
    const child = await Child.create({
      parent_id: parentId,
      firstname,
      lastname,
      birthday,
      walking,
      disabled,
      allergy,
    });
    res.status(201).json(child);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* Delete a child */
const deleteChild = async (req, res) => {
  const parentVerifiedId = req.user._id;
  const { id } = req.params;

  const child = await Child.findById(id);

  if (parentVerifiedId.toString() === child.parent_id.toString()) {
    const deletedChild = await Child.findOneAndDelete({ _id: id });
    return res.status(200).json(deletedChild);
  }

  if (!child) {
    return res.status(404).json({ error: "No such child" });
  }

  return res.status(401).json({ error: "NOT YOUR CHILD" });
};

module.exports = {
  getAllChildren,
  getChildById,
  createChild,
  updateChild,
  deleteChild,
  getChildrenOfEveryone,
};
