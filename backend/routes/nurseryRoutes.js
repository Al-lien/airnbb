const express = require("express");

const router = express.Router();
const {
  getAllNurseries,
  getNurseryById,
  createNursery,
  updateNursery,
  deleteNursery,
} = require("../controllers/nurseryController");

// GET ALL data
router.get("/", getAllNurseries);

// GET SINGLE data
router.get("/:id", getNurseryById);

// CREATE data
router.post("/", createNursery);

// UPDATE data
router.patch("/:id", updateNursery);

// DELETE data
router.delete("/:id", deleteNursery);

module.exports = router;
