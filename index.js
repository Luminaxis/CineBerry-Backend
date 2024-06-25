import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import videoRoutes from './routes/videoRoutes.js';

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'https://cine-berry.vercel.app',
  methods: ['POST', 'GET'],
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);

// Serve static files from the 'uploads' directory
const path = require('path');
const __dirname = path.resolve();
const uploadsPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));

// Error handling for 404 Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
