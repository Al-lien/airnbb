const express = require("express");

const router = express.Router();
const {
  getAllChildren,
  getChildById,
  createChild,
  updateChild,
  deleteChild,
  getChildrenOfEveryone,
} = require("../controllers/childController");

const requireAuth = require("../middlewares/requireAuth");

router.get("/every", getChildrenOfEveryone);

router.use(requireAuth);

router.get("/", getAllChildren);

router.get("/:id", getChildById);

router.post("/", createChild);

router.patch("/:id", updateChild);

router.delete("/:id", deleteChild);

module.exports = router;
