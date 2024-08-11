const mongoose = require("mongoose");
const { model } = require("mongoose");

const OrderSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  userId: {
    type: String,
    required: true,
  },
});

const OrderModel = new model("order", OrderSchema);

module.exports = { OrderModel };
