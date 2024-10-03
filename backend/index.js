const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const userRoutes = require('./routers/userRoutes.js');
const path = require('path');
const errorHandler = require('./middleware/errorHandler.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();

const app = express();

// Middleware

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // If you want to allow cookies to be sent with requests
  }));

// Routes
app.use('/api/users', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
