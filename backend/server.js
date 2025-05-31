const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
const http = require('http')
const socketIo = require('socket.io')

// // Load environment variables first with correct path
dotenv.config({ path: path.resolve(__dirname, './.env') })

// // Debug environment variables
// console.log("Environment variables loaded from:", path.resolve(__dirname, './.env'))
// console.log("MongoDB URI:", process.env.MONGODB_URI || "Using default")
// console.log("Cloudinary Name:", process.env.CLOUDINARY_NAME || "Using default")

const connectDB = require('./config/mongodb')
const connectCloudinary = require('./config/cloudinary')
const adminRouter = require('./routes/adminRoute');
const buyerRouter = require('./routes/buyerRoute');
const chatRouter = require('./routes/chatRoute');
// const router = require('./routes/userRoutes')
// // Fix: Comment out userRoutes temporarily until we fix the generateToken issue
// // const userRoutes = require('./routes/userRoutes');
const app = express()
const port = 6500
const server = http.createServer(app)
// const io = socketIo(server, {
//     cors: {
//         origin: ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174","https://my-fullstack-app-67.onrender.com"],
//         methods: ["GET", "POST"],
//         credentials: true
//     }
// })

// app.set('io', io)

// CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'https://my-fullstack-app-67.onrender.com' ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

connectDB()
connectCloudinary()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// // Routes
app.use('/api/farmer', adminRouter)
app.use('/api/buyer', buyerRouter)
app.use('/api/chat', chatRouter)
// // app.use('/api/user',router)

// // Socket.io connection handling
// io.on('connection', (socket) => {
//     console.log('New client connected');

//     socket.on('send_message', (message) => {
//         io.emit('receive_message', message);
//     });

//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error('Error:', err);
    
//     if (err instanceof mongoose.Error) {
//         return res.status(400).json({
//             success: false,
//             message: 'Database error',
//             error: err.message
//         });
//     }

//     if (err.name === 'ValidationError') {
//         return res.status(400).json({
//             success: false,
//             message: 'Validation error',
//             error: err.message
//         });
//     }

//     res.status(500).json({
//         success: false,
//         message: 'Internal server error',
//         error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
//     });
// })

app.get('/', (req, res) => {
    res.send('hello Ssangram')
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})