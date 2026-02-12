# Connections Backend - Friends & Family Auto-Invite

## Overview

The connections feature lets you add friends and family to your profile, then **auto-invite** them when creating events—no need to type emails every time.

## Setup

1. **Database**: SQLite is used by default. The database file is `prisma/dev.db`.
2. **Environment**: Create `.env` with:
   ```
   DATABASE_URL="file:./dev.db"
   ```
3. **Seed demo data** (optional):
   ```bash
   npm run dev
   # Then POST to /api/seed/events with { "email": "me@example.com", "name": "Me" }
   # Or use the /seed page if available
   ```

## How It Works

### 1. Manage Connections
- Click **Connections** in the header (next to your profile) to open the modal
- Search for users by name or email
- Add them as **friend** or **family**
- Remove connections with the X button

### 2. Auto-Invite When Creating Events
- In **Create Event → Step 5 (Invite Participants)**, your connections appear
- Check the people you want to invite
- They're auto-invited along with any emails you manually add

### 3. Adding New Users
- Users are created when:
  - You complete onboarding / save profile (synced to backend)
  - You add someone by email in the invite step (they're created if new)
  - You run the seed script
- Search finds users by name or email

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/connections?userId=xxx` | List my connections |
| POST | `/api/connections` | Add connection `{ userId, connectedUserId, type: "friend" \| "family" }` |
| DELETE | `/api/connections/[id]` | Remove connection |
| GET | `/api/users?q=search&excludeId=xxx` | Search users |
| POST | `/api/users` | Get or create user `{ email, name }` |
| POST | `/api/events` | Create event with `participantIds` and `inviteeEmails` |

## Database Schema

- **User**: id, email, name, avatar
- **Connection**: fromUserId → toUserId, type (friend|family)
- **Event**: organizer, participants (many-to-many with User)
