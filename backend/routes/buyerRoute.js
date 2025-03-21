const express = require('express');
const { registerBuyer, loginBuyer, getBuyers, updateBuyer } = require('../controllers/buyerController');
const upload = require('../middlewares/multer');
const auth = require('../middleware/auth');

const buyerRouter = express.Router();

// Public routes
buyerRouter.post('/register', upload.single('image'), registerBuyer);
buyerRouter.post('/login', loginBuyer);

// Protected routes
buyerRouter.get('/buyers', auth, getBuyers);
buyerRouter.put('/update/:id', auth, upload.single('image'), updateBuyer);

module.exports = buyerRouter; 