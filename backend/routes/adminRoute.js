const express = require('express')
const { addFarmer, loginFarmer, loginAdmin,  updateFarmer, deleteFarmer, getAllFarmers, getAllBuyers, getUsers, sendMessage, getMessages, addNewProduct, getProductsByFarmerId } = require('../controllers/adminController');
const upload = require('../middlewares/multer.js');
const auth = require('../middleware/auth.js');


const adminRouter = express.Router()

// // Public routes
adminRouter.post('/addfarmer', upload.single('image'), addFarmer)
adminRouter.post('/login', loginFarmer)
adminRouter.post('/admin/login', loginAdmin)
adminRouter.post('/addNewProduct', 
     auth,
    upload.single('avatar'),
     addNewProduct
    );
adminRouter.get('/products', auth, getProductsByFarmerId);
adminRouter.get('/buyers', getAllBuyers)





// // Protected routes

adminRouter.put('/farmer/:id', auth, updateFarmer)
adminRouter.delete('/farmer/:id', auth, deleteFarmer)
adminRouter.get('/farmers', auth, getAllFarmers)





// // Chat routes
// adminRouter.get('/users', getUsers)
// adminRouter.post('/send-message', auth, sendMessage)
// adminRouter.get('/messages/:userId', auth, getMessages)

module.exports = adminRouter


