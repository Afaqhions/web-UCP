# Taakra Backend API

A full-featured backend for the Taakra competition management platform built with Node.js, Express, MongoDB, and Socket.io.

## Features

- ✅ **Clerk Authentication** - OAuth with Google & GitHub + JWT tokens
- ✅ **Competition Management** - Create, update, and manage competitions
- ✅ **User Registration System** - Track user signups for competitions
- ✅ **Real-time Chat** - Socket.io powered user-to-admin messaging with AI support
- ✅ **Admin Dashboard** - Statistics, analytics, and user management
- ✅ **Email Notifications** - Registration, password reset, and event reminders
- ✅ **File Uploads** - Profile pictures and competition images via Cloudinary
- ✅ **AI Integration** - Google Gemini for chat responses and suggestions
- ✅ **Rate Limiting** - Prevent abuse with smart rate limiting
- ✅ **Error Handling** - Global error handler with proper status codes

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** Clerk
- **Real-time:** Socket.io
- **Email:** Node Mailer
- **AI:** Google Gemini
- **File Storage:** Cloudinary
- **Rate Limiting:** Express Rate Limit

## Project Structure

```
server/
├── config/           # Configuration files (database, socket, etc.)
├── controllers/      # Route controllers and business logic
├── middleware/       # Custom middleware (auth, validation, error handling)
├── models/          # MongoDB Mongoose schemas
├── routes/          # API route definitions
├── services/        # Business services (email, AI, tokens, etc.)
├── sockets/         # Socket.io handlers
├── utils/           # Utility functions and helpers
├── .env             # Environment variables
└── server.js        # Main server file
```

## Installation

### 1. Clone and Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create or update your `.env` file with the following:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/webucp

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# JWT (used for refresh tokens and internal tokens)
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_here

# Email Service (Node Mailer - Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password  # Generate app password from Gmail settings

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Cloudinary File Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URLs
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### 3. Start the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Auth Routes (`/api/auth`)
- `POST /sync-clerk-user` - Sync Clerk user to MongoDB (webhook)
- `GET /me` - Get current user profile
- `PUT /profile` - Update user profile
- `POST /deactivate` - Deactivate account

### Users Routes (`/api/users`)
- `GET /` - Get all users
- `GET /search?query=...` - Search users
- `GET /:id` - Get user by ID
- `GET /:id/stats` - Get user statistics

### Competitions Routes (`/api/competitions`)
- `GET /` - Get all competitions (with filters, sort, pagination)
- `GET /trending` - Get trending competitions
- `GET /most-registered` - Get most registered competitions
- `GET /upcoming` - Get upcoming competitions
- `GET /:id` - Get competition by ID
- `GET /slug/:slug` - Get competition by slug
- `POST /` - Create competition (admin only)
- `PUT /:id` - Update competition (admin only)
- `DELETE /:id` - Delete competition (admin only)
- `PATCH /:id/status` - Update competition status (admin only)

### Categories Routes (`/api/categories`)
- `GET /` - Get all categories
- `GET /:id` - Get category by ID
- `GET /:id/competitions` - Get competitions in category
- `POST /` - Create category (admin only)
- `PUT /:id` - Update category (admin only)
- `DELETE /:id` - Delete category (admin only)

### Registrations Routes (`/api/registrations`)
- `POST /` - Create registration
- `GET /my-registrations` - Get user's registrations
- `GET /:id` - Get registration by ID
- `DELETE /:id/cancel` - Cancel registration
- `PUT /:id/confirm` - Confirm registration (admin only)
- `PUT /:id/reject` - Reject registration (admin only)
- `GET /competition/:competitionId` - Get registrations for a competition (admin only)

### Chat Routes (`/api/chats`)
- `POST /initiate` - Start a new chat
- `GET /my-chat` - Get user's chat
- `POST /:chatId/messages` - Send message
- `GET /:chatId/messages` - Get messages
- `PUT /:chatId/mark-read` - Mark messages as read
- `PUT /:chatId/close` - Close chat
- `GET /admin/all` - Get all chats (admin only)
- `PUT /:chatId/assign` - Assign chat to admin (admin only)

### Admin Routes (`/api/admin`)
- `GET /dashboard/stats` - Get dashboard statistics
- `GET /dashboard/charts` - Get dashboard charts
- `GET /users` - Get all users
- `GET /users/:id` - Get user details
- `PUT /users/:id/toggle-status` - Toggle user status
- `GET /registrations/all` - Get all registrations
- `GET /registrations/pending` - Get pending registrations
- `GET /competitions/stats` - Get competition statistics

## Key Features Explained

### 1. Clerk Authentication
- Handles OAuth with Google & GitHub
- Automatic user sync to MongoDB via webhooks
- Protected routes check for valid Clerk tokens

### 2. Real-time Chat with Socket.io
```javascript
// Socket events
socket.on('join', userId) // Join user room
socket.on('send-message', data) // Send message
socket.on('typing', data) // Show typing indicator
socket.on('mark-read', data) // Mark message as read
socket.on('disconnect') // Cleanup on disconnect
```

### 3. Email Service
Sends emails for:
- Welcome messages
- Registration confirmations
- Password reset links
- Competition reminders
- Support replies

### 4. AI Integration
- Generate responses for chat messages
- Suggest competitions based on preferences
- Answer frequently asked questions
- Auto-escalate complex issues

### 5. File Upload with Cloudinary
```javascript
// Upload image (profile, competition)
POST /upload/image
multipart/form-data

// Upload file (attachments)
POST /upload/file
multipart/form-data
```

## Error Handling

All API responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...}
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## Rate Limiting

- **General API:** 100 requests per 15 minutes
- **Authentication:** 5 requests per 15 minutes
- **Create Operations:** 10 requests per minute

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify network access if using MongoDB Atlas

### Clerk Integration Issues
- Verify `CLERK_SECRET_KEY` is correct
- Check webhook configuration in Clerk dashboard
- Ensure webhook secret matches `CLERK_WEBHOOK_SECRET`

### Email Not Sending
- Generate Gmail app password from account settings
- Use app password in `EMAIL_PASSWORD`, not regular password
- Enable "Less secure apps" if using Gmail

### Socket.io Connection Issues
- Check `VITE_SOCKET_URL` matches server URL
- Ensure CORS is configured correctly
- Check browser console for connection errors

## Development Tips

1. **Use Postman/Insomnia** for API testing
2. **Enable Socket.io debugging** by setting `DEBUG=socket.io` environment variable
3. **Seed sample data** for testing by creating seed scripts
4. **Use Mongoose plugins** for timestamps and soft deletes
5. **Implement proper logging** for production

## Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use strong, unique secrets for JWT
3. Enable HTTPS/SSL
4. Set appropriate CORS origins
5. Use environment-specific `.env` files
6. Enable MongoDB authentication
7. Set up database backups
8. Monitor error logs

## Contributing

Follow these conventions:
- Use camelCase for variables and functions
- Use PascalCase for classes and models
- Use UPPER_SNAKE_CASE for constants
- Keep controllers focused on HTTP, logic in services
- Write error messages that users understand

## License

ISC

## Support

For issues and questions, contact the development team.

---

Made with ❤️ for the Taakra Community
