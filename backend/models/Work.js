const { Schema } = require("mongoose");

const { model } = require("mongoose");

const workSchema = new Schema({
  engineer: {
    type: String,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
  employer: {
    type: String,
    required: true,
  },
});

module.exports = model("Work", workSchema);
