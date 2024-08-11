const { model } = require("mongoose");
const { Schema } = require("mongoose");

const EngineerProfileSchema = new Schema({
  image: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  Education: {
    type: String,
    required: true,
  },

  Experience: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

const Engineer = new model("Engineer", EngineerProfileSchema);

module.exports = { Engineer };
