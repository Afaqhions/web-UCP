# Sample Test Data - Taakra Backend

Use this file as reference for all test data needed while testing.

---

## 📝 Test Users (Insert in MongoDB Compass)

### Test User 1 (Regular User)
```json
{
  "clerkId": "user_test_001",
  "email": "testuser@example.com",
  "name": "Test User",
  "role": "user",
  "emailVerified": true,
  "profilePicture": "https://via.placeholder.com/150?text=TestUser",
  "lastLogin": new Date(),
  "isActive": true,
  "createdAt": new Date()
}
```

### Test User 2 (Admin)
```json
{
  "clerkId": "admin_test_001",
  "email": "admin@example.com",
  "name": "Admin User",
  "role": "admin",
  "emailVerified": true,
  "profilePicture": "https://via.placeholder.com/150?text=AdminUser",
  "lastLogin": new Date(),
  "isActive": true,
  "createdAt": new Date()
}
```

---

## 📚 Test Categories

### Category 1 - Programming
```json
{
  "name": "Programming",
  "description": "Coding and software development competitions",
  "icon": "💻",
  "color": "#3B82F6"
}
```

### Category 2 - Design
```json
{
  "name": "Design",
  "description": "UI/UX and graphic design competitions",
  "icon": "🎨",
  "color": "#EC4899"
}
```

### Category 3 - Content Creation
```json
{
  "name": "Content Creation",
  "description": "Video, writing, and media production competitions",
  "icon": "📹",
  "color": "#F59E0B"
}
```

---

## 🏆 Test Competitions

### Competition 1 - Web Development Challenge
```json
{
  "title": "Web Development Challenge 2026",
  "description": "Build a responsive web application using React, Node.js, and MongoDB. Create a full-stack app with authentication, CRUD operations, and real-time features. The application must be fully functional and deployed on a cloud platform.",
  "summary": "Full-stack web development challenge - React + Node.js",
  "category": "[PROGRAMMING_CATEGORY_ID]",
  "rules": [
    "Use only JavaScript frameworks",
    "Must include user authentication",
    "Deployment on any cloud platform",
    "Code must be on GitHub",
    "README with setup instructions required"
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
    },
    {
      "place": "3rd",
      "amount": "$1000",
      "description": "Third place prize"
    }
  ],
  "startDate": "2026-03-01T10:00:00Z",
  "endDate": "2026-03-10T10:00:00Z",
  "registrationDeadline": "2026-02-28T23:59:59Z",
  "maxRegistrations": 100,
  "image": "https://via.placeholder.com/400x300?text=Web+Dev+Challenge",
  "tags": ["web", "javascript", "fullstack", "react", "nodejs"],
  "location": "online"
}
```

### Competition 2 - UI/UX Design Marathon
```json
{
  "title": "UI/UX Design Marathon",
  "description": "Design a complete user interface for a modern mobile app. Focus on user experience, visual hierarchy, accessibility, and design thinking principles. Submit your designs in Figma with detailed documentation.",
  "summary": "Mobile app UI/UX design challenge",
  "category": "[DESIGN_CATEGORY_ID]",
  "rules": [
    "Use Figma or Adobe XD",
    "Mobile-first approach required",
    "Include design rationale document",
    "Accessible color contrast required",
    "500+ component library optional"
  ],
  "prizes": [
    {
      "place": "1st",
      "amount": "$2000",
      "description": "Grand prize + portfolio feature"
    },
    {
      "place": "2nd",
      "amount": "$1000",
      "description": "Runner-up prize"
    }
  ],
  "startDate": "2026-03-15T10:00:00Z",
  "endDate": "2026-03-25T10:00:00Z",
  "registrationDeadline": "2026-03-14T23:59:59Z",
  "maxRegistrations": 50,
  "image": "https://via.placeholder.com/400x300?text=UI+UX+Design",
  "tags": ["design", "ui", "ux", "figma", "mobile"],
  "location": "online"
}
```

### Competition 3 - Content Creation Challenge
```json
{
  "title": "Content Creation Challenge - Tech Tutorials",
  "description": "Create engaging technical tutorial videos about web development, programming, or emerging technologies. Videos should be 5-15 minutes long, high quality, and educational.",
  "summary": "Create YouTube-style tech tutorial videos",
  "category": "[CONTENT_CATEGORY_ID]",
  "rules": [
    "Video length: 5-15 minutes",
    "Minimum 1080p resolution",
    "Original content only",
    "Include closed captions",
    "Summary/description in English"
  ],
  "prizes": [
    {
      "place": "1st",
      "amount": "$1500",
      "description": "Cash + YouTube promotion"
    }
  ],
  "startDate": "2026-04-01T10:00:00Z",
  "endDate": "2026-04-30T10:00:00Z",
  "registrationDeadline": "2026-03-31T23:59:59Z",
  "maxRegistrations": 200,
  "tags": ["content", "video", "tutorial", "education"],
  "location": "online"
}
```

---

## 👥 Test Registrations

### Registration 1 - User registers for Web Dev Challenge
```json
{
  "competitionId": "[COMPETITION_1_ID]",
  "teamMembers": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1-234-567-8900"
    },
    {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": "+1-234-567-8901"
    }
  ],
  "notes": "We are a passionate team of developers excited to participate in this challenge!"
}
```

### Registration 2 - User registers for UI/UX Challenge
```json
{
  "competitionId": "[COMPETITION_2_ID]",
  "teamMembers": [
    {
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "phone": "+1-234-567-8902"
    }
  ],
  "notes": "Solo designer with 5+ years of experience in UI/UX design."
}
```

---

## 💬 Test Chat Messages

### Message 1 - User initiates
```json
{
  "content": "Hello! I need help with the registration process for the Web Development Challenge."
}
```

### Message 2 - Follow-up
```json
{
  "content": "Can you also explain the submission requirements and how to deploy on Heroku?"
}
```

### Message 3 - Admin response
```json
{
  "content": "Hi! Thanks for reaching out. I'm happy to help. You can submit your project GitHub link through the dashboard. For deployment, we accept Heroku, Vercel, AWS, or any other cloud platform."
}
```

---

## 📢 Admin Broadcast Notification

```json
{
  "title": "New Competition Alert!",
  "message": "Check out our latest 'Web Development Challenge 2026' - Win up to $5000! Register now before the deadline on Feb 28.",
  "type": "admin_announcement"
}
```

---

## 🔐 Authentication Headers (For Reference)

When testing protected endpoints, you'll need to add one of these headers:

```
Authorization: Bearer [CLERK_TOKEN]
```

Or for admin routes:
```
Authorization: Bearer [ADMIN_CLERK_TOKEN]
```

---

## 📊 Expected Data After Complete Testing

### Users Collection (2 documents)
- 1 Regular User
- 1 Admin User

### Categories Collection (3 documents)
- Programming
- Design  
- Content Creation

### Competitions Collection (3 documents)
- Web Dev Challenge (published)
- UI/UX Design Marathon (draft)
- Content Creation Challenge (draft)

### Registrations Collection (2 documents)
- 1 confirmed (Web Dev)
- 1 pending (UI/UX)

### Chats Collection (1 document)
- 2-3 messages
- Assigned to admin
- Mark messages as read

### Notifications Collection (2 documents)
- Both broadcast notifications
- Both unread

---

## 🎯 Quick Copy-Paste Commands

Replace `[ID]` with actual IDs from previous responses.

```bash
# Test Category Creation
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Programming",
    "description": "Coding competitions",
    "icon": "💻",
    "color": "#3B82F6"
  }'

# Test Competition Creation
curl -X POST http://localhost:5000/api/competitions \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Web Dev Challenge 2026",
    "description": "Build a full-stack web app",
    "category": "[CATEGORY_ID]",
    "startDate": "2026-03-01T10:00:00Z",
    "endDate": "2026-03-10T10:00:00Z",
    "registrationDeadline": "2026-02-28T23:59:59Z",
    "maxRegistrations": 100
  }'

# Test Get All Competitions
curl http://localhost:5000/api/competitions

# Test Publish Competition
curl -X PATCH http://localhost:5000/api/competitions/[COMP_ID]/status \
  -H "Content-Type: application/json" \
  -d '{"status": "published"}'

# Test Get Dashboard Stats
curl http://localhost:5000/api/admin/dashboard/stats \
  -H "Authorization: Bearer [ADMIN_TOKEN]"
```

---

Use this file as your reference guide while testing. Good luck! 🚀
