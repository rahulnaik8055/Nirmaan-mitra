require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3002;
const InitialProducts = require("./data");
const MONGO_URL = require("../config");

const { ProductsModel } = require("../models/ProductsModel");

app.get("/", (req, res) => {
  res.send("hi I am root");
});

app.get("/productsinsert", async (req, res) => {
  try {
    await ProductsModel.deleteMany({});

    for (const product of InitialProducts) {
      let newProduct = new ProductsModel({
        imgSrc: product.imgSrc,
        title: product.title,
        Price: product.Price,
        Quantity: product.Quantity,
      });

      await newProduct.save().then(() => {
        console.log("data is initialised");
      });
    }

    console.log("Data is successfully initialized");
    res.send("DONE");
  } catch (error) {
    console.error("Error initializing data:", error);
    res.status(500).send("An error occurred");
  }
});

app.listen(PORT, () => {
  console.log(`app started at the port`);
  mongoose.connect(MONGO_URL);
  console.log("Connected to the database successfully");
});
