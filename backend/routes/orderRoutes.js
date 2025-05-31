// const express = require('express');
// const router = express.Router();
// const Order = require('../models/orderModel.js');

// router.post('/', authMiddleware, async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;
//     const buyerId = req.user._id; 

//     const newOrder = new Order({
//       product: productId,
//       buyer: buyerId,
//       quantity,
//     });

//     await newOrder.save();
//     res.status(201).json({ success: true, message: 'Order placed successfully', order: newOrder });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Order failed' });
//   }
// });

// module.exports = router;