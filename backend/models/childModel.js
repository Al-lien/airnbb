const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      async validator(value) {
        // Vérifier si le parent_id existe dans la collection "parent"
        const parent = await mongoose.model("User").findById(value);
        if (parent === null) {
          return false;
        }
        return true;
      },
      message: "Parent with this ID does not exist.",
    },
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
  },
  walking: {
    type: Boolean,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
  allergy: {
    type: Boolean,
    required: true,
  },
});

const Child = mongoose.model("Child", childSchema);
module.exports = Child;
