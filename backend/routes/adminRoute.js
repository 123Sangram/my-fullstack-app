const express = require('express')
const { addFarmer, loginFarmer, loginAdmin, getFarmer, updateFarmer, deleteFarmer, getAllFarmers, getUsers, sendMessage, getMessages } = require('../controllers/adminController');
const upload = require('../middlewares/multer.js');
const auth = require('../middleware/auth');

const adminRouter = express.Router()

// Public routes
adminRouter.post('/addfarmer', upload.single('image'), addFarmer)
adminRouter.post('/login', loginFarmer)
adminRouter.post('/admin/login', loginAdmin)

// Protected routes
adminRouter.get('/farmer/:id', auth, getFarmer)
adminRouter.put('/farmer/:id', auth, updateFarmer)
adminRouter.delete('/farmer/:id', auth, deleteFarmer)
adminRouter.get('/farmers', auth, getAllFarmers)

// Chat routes
adminRouter.get('/users', getUsers)
adminRouter.post('/send-message', auth, sendMessage)
adminRouter.get('/messages/:userId', auth, getMessages)

module.exports = adminRouter


