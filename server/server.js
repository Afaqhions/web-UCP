// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// const { ClerkExpressWithAuth } = require('@clerk/express');
const { clerkMiddleware, requireAuth } = require("@clerk/express");

const http = require('http');
const { Server } = require('socket.io');

// Load environment variables
dotenv.config();

// Log Clerk environment
console.log('🔐 Clerk Secret Key:', process.env.CLERK_SECRET_KEY ? '✅ Loaded' : '❌ Missing');

// Import database connection
const connectDB = require('./config/database');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const competitionRoutes = require('./routes/competitionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const chatRoutes = require('./routes/chatRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Import middleware
const globalErrorHandler = require('./middleware/errorHandler');
const { generalLimiter } = require('./middleware/rateLimiter');

// Import socket handler
const chatHandler = require('./sockets/chatHandler');

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.VITE_API_URL || 'http://localhost:3000',
    credentials: true,
  },
});

// ⭐ HEALTH CHECK - FIRST ROUTE (NO MIDDLEWARE)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date(),
  });
});

// Middleware
app.use(cors({
  origin: process.env.VITE_API_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rate limiting
app.use('/api/', generalLimiter);

// ⭐ DO NOT apply Clerk middleware globally - apply only to routes that need it
// This prevents 500 errors on public endpoints

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/competitions', competitionRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error handler
app.use(globalErrorHandler);

// Socket.io connections
io.on('connection', (socket) => {
  chatHandler(io, socket);
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n🚀 Server is running on port ${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
  console.log(`💬 Socket.io: http://localhost:${PORT}`);
  console.log(`\n✅ Environment: ${process.env.NODE_ENV}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

module.exports = { app, server, io };
