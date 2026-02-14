# 🧪 Complete Testing Roadmap - Taakra Backend

This guide will help you test every endpoint and verify your backend is working correctly.

## 📋 Pre-Testing Checklist

- [ ] MongoDB is running locally on port 27017
- [ ] Server is running on port 5000 (`npm run dev`)
- [ ] .env file is properly configured
- [ ] MongoDB Compass is open to view data
- [ ] Postman/Insomnia is installed for API testing
- [ ] All 50+ endpoints are ready to test

---

## 🚀 Testing Setup

### 1. Start MongoDB
```powershell
# Check if MongoDB is running
mongod --version

# Start MongoDB service (Windows)
net start MongoDB
# Or using brew (Mac): brew services start mongodb-community
```

### 2. Start the Server
```powershell
cd server
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server is running on port 5000
📡 API: http://localhost:5000/api
```

### 3. Open MongoDB Compass
- **Connection String:** `mongodb://localhost:27017`
- Database to watch: `webucp`
- Collections to monitor: Users, Competitions, Categories, Registrations, Chats, Notifications

### 4. Open Postman/Insomnia
- Create new workspace called "Taakra Testing"
- Base URL: `http://localhost:5000/api`
- Set up environment variables for tokens (if needed)

---

## 🧭 TESTING ROADMAP - Sequential Order

Follow this exact order for comprehensive testing:

### **PHASE 1: Setup & Health Check** (5 minutes)

#### 1.1 Health Check
```
GET http://localhost:5000/api/health
```
**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-02-14T..."
}
```

✅ **Verification:** If you see success, server is running

---

### **PHASE 2: Categories Setup** (10 minutes)

> **Why first?** Competitions need categories, so set them up before creating competitions.

#### 2.1 Create Category 1
```
POST http://localhost:5000/api/categories
Header: Content-Type: application/json
Body:
{
  "name": "Programming",
  "description": "Coding and software development competitions",
  "icon": "💻",
  "color": "#3B82F6"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Programming",
    "description": "Coding and software development competitions",
    "icon": "💻",
    "color": "#3B82F6",
    "isActive": true,
    "competitionCount": 0,
    "createdAt": "2026-02-14T..."
  }
}
```

✅ **Verification in MongoDB Compass:**
- Go to: `webucp` → `categories`
- You should see 1 document with `name: "Programming"`
- **Copy the `_id` field - you'll need it for creating competitions**

#### 2.2 Create Category 2
```
POST http://localhost:5000/api/categories
Body:
{
  "name": "Design",
  "description": "UI/UX and graphic design competitions",
  "icon": "🎨",
  "color": "#EC4899"
}
```

#### 2.3 Get All Categories
```
GET http://localhost:5000/api/categories
```

**Expected Response:**
```json
{
  "success": true,
  "results": 2,
  "total": 2,
  "page": 1,
  "pageSize": 10,
  "data": [
    { /* Category 1 */ },
    { /* Category 2 */ }
  ]
}
```

✅ **Verification:** You should see both categories

#### 2.4 Get Specific Category
```
GET http://localhost:5000/api/categories/[CATEGORY_ID]
```
(Replace [CATEGORY_ID] with the _id from 2.1)

**Expected Response:**
```json
{
  "success": true,
  "data": { /* Category details */ }
}
```

---

### **PHASE 3: Competition Management** (15 minutes)

> **Prerequisites:** Have category IDs from Phase 2

#### 3.1 Create Competition 1
```
POST http://localhost:5000/api/competitions
Header: Content-Type: application/json
Body:
{
  "title": "Web Development Challenge 2026",
  "description": "Build a responsive web application using React, Node.js, and MongoDB. Create a full-stack app with authentication, CRUD operations, and real-time features.",
  "summary": "Full-stack web development challenge - React + Node.js",
  "category": "[PROGRAMMING_CATEGORY_ID]",
  "rules": [
    "Use only JavaScript frameworks",
    "Must include user authentication",
    "Deployment on any cloud platform"
  ],
  "prizes": [
    {
      "place": "1st",
      "amount": "$5000",
      "description": "Winner prize"
    },
    {
      "place": "2nd",
      "amount": "$3000",
      "description": "Runner-up prize"
    }
  ],
  "startDate": "2026-03-01T10:00:00Z",
  "endDate": "2026-03-10T10:00:00Z",
  "registrationDeadline": "2026-02-28T23:59:59Z",
  "maxRegistrations": 100,
  "image": "https://via.placeholder.com/400x300?text=Web+Dev",
  "tags": ["web", "javascript", "fullstack"],
  "location": "online"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Competition created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Web Development Challenge 2026",
    "slug": "web-development-challenge-2026",
    "status": "draft",
    "currentRegistrations": 0,
    "views": 0,
    "createdAt": "2026-02-14T..."
  }
}
```

✅ **Verification in MongoDB Compass:**
- Go to: `webucp` → `competitions`
- You should see the competition with `status: "draft"`
- **Copy the `_id` - needed for later testing**

#### 3.2 Create Competition 2
```
POST http://localhost:5000/api/competitions
Body:
{
  "title": "UI/UX Design Marathon",
  "description": "Design a complete user interface for a mobile app. Focus on user experience, visual hierarchy, and accessibility.",
  "summary": "Mobile app UI/UX design challenge",
  "category": "[DESIGN_CATEGORY_ID]",
  "rules": [
    "Use Figma or Adobe XD",
    "Mobile-first approach",
    "Include design rationale"
  ],
  "prizes": [
    {
      "place": "1st",
      "amount": "$2000",
      "description": "Grand prize"
    }
  ],
  "startDate": "2026-03-15T10:00:00Z",
  "endDate": "2026-03-25T10:00:00Z",
  "registrationDeadline": "2026-03-14T23:59:59Z",
  "maxRegistrations": 50,
  "tags": ["design", "ui", "ux"],
  "location": "online"
}
```

#### 3.3 Publish Competition 1
```
PATCH http://localhost:5000/api/competitions/[COMPETITION_1_ID]/status
Body:
{
  "status": "published"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Competition status updated to published",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "status": "published"
  }
}
```

✅ **Verification in MongoDB Compass:** Status should change to "published"

#### 3.4 Get All Competitions (Published)
```
GET http://localhost:5000/api/competitions
```

**Expected Response:**
```json
{
  "success": true,
  "results": 1,
  "total": 1,
  "page": 1,
  "pageSize": 10,
  "data": [ /* Only published competitions */ ]
}
```

#### 3.5 Get Specific Competition (View Count)
```
GET http://localhost:5000/api/competitions/[COMPETITION_1_ID]
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "views": 1,  // ← Should increment
    ...
  }
}
```

✅ **Verification:** Call it 3 times and check that `views` increases (1 → 2 → 3)

#### 3.6 Get Trending Competitions
```
GET http://localhost:5000/api/competitions/trending
```

**Expected Response:** Should show competitions sorted by views and registrations

#### 3.7 Get Upcoming Competitions
```
GET http://localhost:5000/api/competitions/upcoming
```

**Expected Response:** Should show competitions with startDate in future, sorted by date

#### 3.8 Get Competition by Slug
```
GET http://localhost:5000/api/competitions/slug/web-development-challenge-2026
```

**Expected Response:** Same competition data

#### 3.9 Update Competition
```
PUT http://localhost:5000/api/competitions/[COMPETITION_1_ID]
Body:
{
  "description": "Updated description - This is the best web development competition!",
  "maxRegistrations": 150
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Competition updated successfully",
  "data": { /* Updated competition */ }
}
```

---

### **PHASE 4: User Authentication & Profile** (20 minutes)

> **Note:** Clerk provides OAuth authentication. We need to manually create a test user in MongoDB for testing registration flows.

#### 4.1 Create Test User in MongoDB Compass

**Manual approach:**
1. Open MongoDB Compass
2. Go to: `webucp` → `users`
3. Click "Insert Document"
4. Paste this JSON:
```json
{
  "clerkId": "user_test_001",
  "email": "testuser@example.com",
  "name": "Test User",
  "role": "user",
  "emailVerified": true,
  "profilePicture": "https://via.placeholder.com/150",
  "lastLogin": new Date(),
  "isActive": true,
  "createdAt": new Date()
}
```
5. Click "Insert"

✅ **Verification:** User should appear in `users` collection
**Copy the `_id` - you'll need it for registration testing**

#### 4.2 Create Test Admin User in MongoDB
```json
{
  "clerkId": "admin_test_001",
  "email": "admin@example.com",
  "name": "Admin User",
  "role": "admin",
  "emailVerified": true,
  "profilePicture": "https://via.placeholder.com/150",
  "lastLogin": new Date(),
  "isActive": true,
  "createdAt": new Date()
}
```

#### 4.3 Get Current User
```
GET http://localhost:5000/api/auth/me
Header: Authorization: Bearer [CLERK_TOKEN]
```

**Note:** For Clerk authentication, you need a valid token from Clerk. For testing:
- Test via Clerk's development mode
- Or mock the auth middleware for testing

**For now, skip this if you don't have Clerk setup complete**

#### 4.4 Update User Profile
```
PUT http://localhost:5000/api/auth/profile
Header: Authorization: Bearer [CLERK_TOKEN]
Body:
{
  "name": "Updated Test User",
  "profilePicture": "https://via.placeholder.com/150?text=New+Avatar"
}
```

---

### **PHASE 5: Registrations** (20 minutes)

> **Prerequisites:** Have user and competition IDs

#### 5.1 Create Registration
```
POST http://localhost:5000/api/registrations
Header: Authorization: Bearer [USER_TOKEN]
Body:
{
  "competitionId": "[COMPETITION_1_ID]",
  "teamMembers": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "123-456-7890"
    },
    {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": "098-765-4321"
    }
  ],
  "notes": "We are excited to participate in this competition!"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Registration created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "user": "[USER_ID]",
    "competition": "[COMPETITION_1_ID]",
    "status": "pending",
    "registeredAt": "2026-02-14T...",
    "paymentStatus": "pending"
  }
}
```

✅ **Verification in MongoDB Compass:**
- Go to: `webucp` → `registrations`
- Should see the registration with `status: "pending"`
- Competition's `currentRegistrations` should increase by 1
- **Copy the registration `_id`**

#### 5.2 Get My Registrations (User)
```
GET http://localhost:5000/api/registrations/my-registrations
Header: Authorization: Bearer [USER_TOKEN]
```

**Expected Response:**
```json
{
  "success": true,
  "results": 1,
  "total": 1,
  "page": 1,
  "pageSize": 10,
  "data": [ /* User's registrations */ ]
}
```

#### 5.3 Get Registration by ID
```
GET http://localhost:5000/api/registrations/[REGISTRATION_ID]
Header: Authorization: Bearer [USER_TOKEN]
```

**Expected Response:** Full registration details

#### 5.4 Confirm Registration (Admin)
```
PUT http://localhost:5000/api/registrations/[REGISTRATION_ID]/confirm
Header: Authorization: Bearer [ADMIN_TOKEN]
Body: {}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Registration confirmed successfully",
  "data": {
    "status": "confirmed",
    "confirmedAt": "2026-02-14T...",
    "confirmedBy": "[ADMIN_ID]"
  }
}
```

✅ **Verification in MongoDB Compass:**
- Registration status should change to "confirmed"
- `confirmedAt` and `confirmedBy` should be populated

#### 5.5 Try Creating Duplicate Registration
```
POST http://localhost:5000/api/registrations
Body:
{
  "competitionId": "[COMPETITION_1_ID]",
  "teamMembers": []
}
```

**Expected Response (Error):**
```json
{
  "success": false,
  "message": "You are already registered for this competition"
}
```

✅ **Verification:** Should fail with 400 error

#### 5.6 Create Second Registration for Different Competition
```
POST http://localhost:5000/api/registrations
Body:
{
  "competitionId": "[COMPETITION_2_ID]",
  "teamMembers": []
}
```

✅ **Verification:** Should succeed - same user can register for multiple competitions

#### 5.7 Get Registrations for a Competition (Admin)
```
GET http://localhost:5000/api/registrations/competition/[COMPETITION_1_ID]
Header: Authorization: Bearer [ADMIN_TOKEN]
```

**Expected Response:**
```json
{
  "success": true,
  "results": 1,
  "total": 1,
  "data": [ /* All registrations for this competition */ ]
}
```

#### 5.8 Cancel Registration (User)
```
DELETE http://localhost:5000/api/registrations/[REGISTRATION_2_ID]/cancel
Header: Authorization: Bearer [USER_TOKEN]
Body:
{
  "reason": "Changed my mind about participation"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Registration cancelled successfully"
}
```

✅ **Verification in MongoDB Compass:**
- Status should change to "cancelled"
- `cancelledAt` should be populated
- Competition's `currentRegistrations` should decrease by 1

---

### **PHASE 6: Chat System** (20 minutes)

> **Prerequisites:** Have user ID

#### 6.1 Initialize Chat
```
POST http://localhost:5000/api/chats/initiate
Header: Authorization: Bearer [USER_TOKEN]
Body: {}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Chat initialized",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "user": "[USER_ID]",
    "messages": [],
    "isActive": true,
    "createdAt": "2026-02-14T..."
  }
}
```

✅ **Verification in MongoDB Compass:**
- Go to: `webucp` → `chats`
- Should see the chat document with empty messages array
- **Copy the chat `_id`**

#### 6.2 Get User Chat
```
GET http://localhost:5000/api/chats/my-chat
Header: Authorization: Bearer [USER_TOKEN]
```

**Expected Response:** Same chat data

#### 6.3 Send Message
```
POST http://localhost:5000/api/chats/[CHAT_ID]/messages
Header: Authorization: Bearer [USER_TOKEN]
Body:
{
  "content": "Hello! I need help with the registration process.",
  "attachments": []
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "messages": [
      {
        "_id": "...auto-generated",
        "sender": "[USER_ID]",
        "content": "Hello! I need help with the registration process.",
        "timestamp": "2026-02-14T...",
        "read": false,
        "delivered": true
      }
    ]
  }
}
```

✅ **Verification in MongoDB Compass:**
- `messages` array should have 1 item
- `lastMessageAt` should update

#### 6.4 Send Another Message
```
POST http://localhost:5000/api/chats/[CHAT_ID]/messages
Body:
{
  "content": "Can you also help me understand the competition rules?"
}
```

#### 6.5 Get Messages
```
GET http://localhost:5000/api/chats/[CHAT_ID]/messages
Header: Authorization: Bearer [USER_TOKEN]
```

**Expected Response:**
```json
{
  "success": true,
  "total": 2,
  "results": 2,
  "page": 1,
  "pageSize": 50,
  "data": [ /* Messages */ ]
}
```

#### 6.6 Mark Messages as Read
```
PUT http://localhost:5000/api/chats/[CHAT_ID]/mark-read
Header: Authorization: Bearer [USER_TOKEN]
Body:
{
  "messageIds": ["[MESSAGE_ID_1]", "[MESSAGE_ID_2]"]
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Messages marked as read"
}
```

✅ **Verification in MongoDB Compass:**
- Messages should have `read: true`

#### 6.7 Assign Chat to Admin
```
PUT http://localhost:5000/api/chats/[CHAT_ID]/assign
Header: Authorization: Bearer [ADMIN_TOKEN]
Body:
{
  "adminId": "[ADMIN_USER_ID]"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Chat assigned to admin successfully",
  "data": {
    "admin": "[ADMIN_ID]",
    "isEscalated": false
  }
}
```

#### 6.8 Admin Sends Message
```
POST http://localhost:5000/api/chats/[CHAT_ID]/messages
Header: Authorization: Bearer [ADMIN_TOKEN]
Body:
{
  "content": "Hi! Thank you for reaching out. I'm here to help. What's your question?"
}
```

#### 6.9 Close Chat
```
PUT http://localhost:5000/api/chats/[CHAT_ID]/close
Header: Authorization: Bearer [USER_TOKEN]
Body: {}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Chat closed successfully"
}
```

✅ **Verification in MongoDB Compass:**
- `isActive` should be `false`

#### 6.10 Get All Chats (Admin)
```
GET http://localhost:5000/api/chats/admin/all
Header: Authorization: Bearer [ADMIN_TOKEN]
```

**Expected Response:**
```json
{
  "success": true,
  "results": 1,
  "total": 1,
  "data": [ /* All chats */ ]
}
```

---

### **PHASE 7: User Management** (10 minutes)

#### 7.1 Get All Users
```
GET http://localhost:5000/api/users
```

**Expected Response:**
```json
{
  "success": true,
  "results": 2,
  "total": 2,
  "page": 1,
  "pageSize": 10,
  "data": [ /* All users */ ]
}
```

#### 7.2 Get Specific User
```
GET http://localhost:5000/api/users/[USER_ID]
```

**Expected Response:** User details

#### 7.3 Get User Statistics
```
GET http://localhost:5000/api/users/[USER_ID]/stats
```

**Expected Response:**
```json
{
  "success": true,
  "stats": {
    "totalRegistrations": 1,
    "pendingRegistrations": 0,
    "attendedCompetitions": 0
  }
}
```

#### 7.4 Search Users
```
GET http://localhost:5000/api/users/search?query=Test
```

**Expected Response:** Matches "Test User" created earlier

---

### **PHASE 8: Admin Dashboard** (15 minutes)

#### 8.1 Get Dashboard Stats
```
GET http://localhost:5000/api/admin/dashboard/stats
Header: Authorization: Bearer [ADMIN_TOKEN]
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 2,
    "totalCompetitions": 1,
    "totalRegistrations": 1,
    "totalCategories": 2,
    "totalChats": 1,
    "pendingRegistrations": 0,
    "activeUsers": 2
  }
}
```

✅ **Verification:** Numbers should match what you created

#### 8.2 Get Dashboard Charts
```
GET http://localhost:5000/api/admin/dashboard/charts
Header: Authorization: Bearer [ADMIN_TOKEN]
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "registrationsTrend": [ /* Last 30 days */ ],
    "competitionsByCategory": [ /* Category breakdown */ ],
    "registrationsByStatus": [ /* Status distribution */ ]
  }
}
```

#### 8.3 Toggle User Status
```
PUT http://localhost:5000/api/admin/users/[USER_ID]/toggle-status
Header: Authorization: Bearer [ADMIN_TOKEN]
Body: {}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User deactivated successfully"
}
```

✅ **Verification in MongoDB Compass:**
- User's `isActive` should become `false`

#### 8.4 Get All Registrations (Admin)
```
GET http://localhost:5000/api/admin/registrations/all
Header: Authorization: Bearer [ADMIN_TOKEN]
```

#### 8.5 Get Pending Registrations
```
GET http://localhost:5000/api/admin/registrations/pending
Header: Authorization: Bearer [ADMIN_TOKEN]
```

#### 8.6 Get Competition Stats
```
GET http://localhost:5000/api/admin/competitions/stats
Header: Authorization: Bearer [ADMIN_TOKEN]
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "stats": [ /* Status distribution */ ],
    "topCompetitions": [ /* Top 10 by registrations */ ]
  }
}
```

#### 8.7 Broadcast Notification
```
POST http://localhost:5000/api/admin/notifications/broadcast
Header: Authorization: Bearer [ADMIN_TOKEN]
Body:
{
  "title": "New Competition Alert",
  "message": "Check out our latest Web Development Challenge!",
  "type": "admin_announcement"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Notification sent to 2 users",
  "sentTo": 2
}
```

✅ **Verification in MongoDB Compass:**
- Go to: `webucp` → `notifications`
- Should see 2 notifications (one for each user)

---

## 📊 MongoDB Compass Verification Checklist

After completing all phases, verify your MongoDB has these collections with data:

```
webucp/
├── users/              ✅ Should have 2 documents (1 user, 1 admin)
├── categories/         ✅ Should have 2 documents
├── competitions/       ✅ Should have 2 documents
├── registrations/      ✅ Should have 1 document (1 cancelled, 1 confirmed)
├── chats/             ✅ Should have 1 document with messages
└── notifications/      ✅ Should have 2 documents
```

### Sample Data Summary After Testing

**Users Collection:**
```
Total: 2 documents
- 1 regular user
- 1 admin user
```

**Categories Collection:**
```
Total: 2 documents
- Programming (1 competition)
- Design (0 competitions)
```

**Competitions Collection:**
```
Total: 2 documents
- Web Development Challenge (1 published, 1 view, 1 registration)
- UI/UX Design Marathon (1 draft, 0 views, 0 registrations)
```

**Registrations Collection:**
```
Total: 2 documents
- 1 confirmed (2026-02-14)
- 1 cancelled (2026-02-14)
```

**Chats Collection:**
```
Total: 1 document
- 2 messages
- assigned to admin
- is closed
```

**Notifications Collection:**
```
Total: 2 documents
- Both "admin_announcement" type
- Both unread (read: false)
```

---

## 🔍 Debugging & Troubleshooting

### Issue: "Cannot POST /api/..." 
**Solution:** Check the exact endpoint spelling, verify middleware is loaded

### Issue: "MongoDB connection failed"
**Solution:** 
- Check MongoDB is running: `mongod --version`
- Verify connection string in .env
- Check port 27017 is available

### Issue: "User not found in database"
**Solution:** Make sure you created the test user in MongoDB Compass first

### Issue: "Cannot read property '_id' of undefined"
**Solution:** You're missing a required ID in the request body or URL

### Issue: "Rate limit exceeded"
**Solution:** Wait 15 minutes or restart the server

### Helpful Commands

```powershell
# Check MongoDB is running
Get-Service MongoDB

# Start MongoDB service
Start-Service MongoDB

# Stop MongoDB service
Stop-Service MongoDB

# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process on port 5000 (if needed)
taskkill /PID [PID_NUMBER] /F
```

---

## ✅ Final Verification Checklist

After testing all endpoints:

- [ ] Health check returns success
- [ ] Can create categories
- [ ] Can create competitions
- [ ] Competition status can be updated
- [ ] Competition views increment
- [ ] Can register for competition
- [ ] Cannot register twice
- [ ] Can see registrations in MongoDB
- [ ] Admin can confirm registration
- [ ] Can initialize chat
- [ ] Can send messages
- [ ] Can mark messages as read
- [ ] Admin can assign chat
- [ ] Can close chat
- [ ] Dashboard stats are accurate
- [ ] Can broadcast notifications
- [ ] All MongoDB collections have correct data

---

## 🎯 Quick Testing Commands

**Copy-paste ready:**

```
# 1. Create Programming Category
POST http://localhost:5000/api/categories
{
  "name": "Programming",
  "description": "Coding competitions",
  "icon": "💻",
  "color": "#3B82F6"
}

# 2. Create Web Dev Competition
POST http://localhost:5000/api/competitions
{
  "title": "Web Dev Challenge",
  "description": "Build a web app",
  "category": "[CATEGORY_ID]",
  "startDate": "2026-03-01T10:00:00Z",
  "endDate": "2026-03-10T10:00:00Z",
  "registrationDeadline": "2026-02-28T23:59:59Z",
  "maxRegistrations": 100
}

# 3. Publish Competition
PATCH http://localhost:5000/api/competitions/[COMP_ID]/status
{
  "status": "published"
}

# 4. Get Competitions
GET http://localhost:5000/api/competitions

# 5. Initialize Chat
POST http://localhost:5000/api/chats/initiate

# 6. Send Message
POST http://localhost:5000/api/chats/[CHAT_ID]/messages
{
  "content": "Hello!"
}
```

---

Enjoy testing! 🚀
