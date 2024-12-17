const express = require("express");
const OrderModel = require("../models/ordermodel")
const ProductModel = require("../models/ProductModel");
const Route = express.Router();

// Get All Orders
Route.get("/", async (req, res) => {
  try {
    const orders = await OrderModel.find({}).populate("userId").populate("products.productId");
    res.status(200).json({
      isSuccessful: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      isSuccessful: false,
      error: error.message,
    });
  }
});

// Get Order By ID
Route.get("/:id", async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id).populate("userId").populate("products.productId");
    if (!order) {
      return res.status(404).json({
        isSuccessful: false,
        error: "Order not found",
      });
    }
    res.status(200).json({
      isSuccessful: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      isSuccessful: false,
      error: error.message,
    });
  }
});

// Create Order
Route.post("/", async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Calculate Total Price
    let totalPrice = 0;
    for (const item of products) {
      const product = await ProductModel.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          isSuccessful: false,
          error: `Product with ID ${item.productId} not found`,
        });
      }
      totalPrice += product.price * item.quantity;
    }

    // Create Order
    const order = new OrderModel({
      userId,
      products,
      totalPrice,
    });

    const savedOrder = await order.save();
    res.status(201).json({
      isSuccessful: true,
      data: savedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      isSuccessful: false,
      error: error.message,
    });
  }
});

// Update Order Status
Route.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await OrderModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        isSuccessful: false,
        error: "Order not found",
      });
    }

    res.status(200).json({
      isSuccessful: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      isSuccessful: false,
      error: error.message,
    });
  }
});

// Delete Order
Route.delete("/:id", async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({
        isSuccessful: false,
        error: "Order not found",
      });
    }

    res.status(200).json({
      isSuccessful: true,
      message: "Order deleted successfully",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      isSuccessful: false,
      error: error.message,
    });
  }
});

module.exports = Route;
