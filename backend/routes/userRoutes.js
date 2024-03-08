const express = require("express");

const router = express.Router();
const {
  getAllData,
  getSingleData,
  loginUser,
  signupUser,
  updateData,
  deleteData,
} = require("../controllers/userControllers");

// GET ALL data
router.get("/users", getAllData);

// GET SINGLE data
router.get("/users/:id", getSingleData);

// CREATE data
router.post("/login", loginUser);
router.post("/signup", signupUser);

// UPDATE data
router.patch("/users/:id", updateData);

// DELETE data
router.delete("/users/:id", deleteData);

module.exports = router;
