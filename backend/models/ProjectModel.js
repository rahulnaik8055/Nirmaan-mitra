const { Schema, model, default: mongoose } = require("mongoose");

const ProjectSchema = new Schema({
  ProjectName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fconstruction&psig=AOvVaw3pGSGN1JUICypKYFc0u6o7&ust=1723444565883000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKDmzs6p7IcDFQAAAAAdAAAAABAE", // Replace with your actual default image URL
  },
  location: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Project = model("project", ProjectSchema);

module.exports = { Project };
