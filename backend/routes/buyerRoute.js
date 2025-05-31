const express = require('express');
const { registerBuyer, loginBuyer, getBuyers, getAllFarmersWithProducts, updateBuyer } = require('../controllers/buyerController.js');
const upload = require('../middlewares/multer');
const auth = require('../middleware/auth');
const {addOrder} = require('../controllers/addOrderController.js')
const {getAllUsers,sendMessage,getMessages} = require('../controllers/chatController.js')

const buyerRouter = express.Router();

// // Public routes
buyerRouter.post('/register', upload.single('image'), registerBuyer);
buyerRouter.post('/login', loginBuyer);

// // Protected routes
// buyerRouter.get('/buyers', auth, getBuyers);
buyerRouter.get('/getAllFarmersWithProducts',  getAllFarmersWithProducts);
// buyerRouter.put('/update/:id', auth, upload.single('image'), updateBuyer);
buyerRouter.post('/addorder', addOrder);


// for chat

buyerRouter.get('/users',  getAllUsers)
buyerRouter.post('/send-message', auth, sendMessage)
buyerRouter.get('/messages/:userId', auth, getMessages)

module.exports = buyerRouter; 