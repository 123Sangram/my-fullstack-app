const Order = require('../models/orderModel.js');
const Product = require('../models/addProduct.model.js');

const addOrder = async (req, res) => {
  try {
    const { buyerId, productName, quantity } = req.body;

    const product = await Product.findOne({ productname: productName });
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.quantity < quantity)
      return res.status(400).json({ message: "Not enough quantity available" });

    const newOrder = await Order.create({
      buyerId,
      productId: product._id,
      quantity
    });

    product.quantity -= quantity;
    await product.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error: error.message });
  }
};

module.exports = { addOrder };
