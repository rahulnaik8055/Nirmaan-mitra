const { model } = require("mongoose");
const { Schema } = require("mongoose");

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Quantity: String,
  imgSrc: {
    type: String,
    required: true,
  },
});

const ProductsModel = new model("product", ProductSchema);

module.exports = { ProductsModel };
