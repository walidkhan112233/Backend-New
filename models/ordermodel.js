const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "ProductModel", required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: "Pending", enum: ["Pending", "Confirmed", "Shipped", "Delivered"] },
  createdAt: { type: Date, default: Date.now },
});
const OrderModel = mongoose.model("OrderModel", OrderSchema)

module.exports = OrderModel;
