# Blogging Platform Backend API

A RESTful API for a blogging platform built with Node.js, Express, MongoDB, and JWT authentication.

## Features

- User Registration and Authentication
- JWT Token-based Authorization
- Password Hashing with bcrypt
- User Dashboard functionality
- MongoDB database integration
- Cookie-based token storage

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```
   PORT=3000
   MONGODB_URL=mongodb://localhost:27017/Blogging-platform
   SECRET_KEY=Blogging@1234
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3000`

## API Endpoints

### Authentication Routes (`/auth`)

#### 1. User Registration

- **Endpoint**: `POST /auth/signup`
- **Description**: Register a new user account
- **Middleware**: `RegisterValidation`
- **Input Requirements**:
  ```json
  {
    "name": "string (required)",
    "email": "string (required, unique)",
    "password": "string (required)"
  }
  ```
- **Success Response** (201):
  ```json
  {
    "_id": "user_object_id",
    "name": "John Doe",
    "email": "john@example.com",
    "password": " ",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```
- **Error Responses**:
  - `404`: Missing required fields
  - `400`: User already exists
  - `500`: Server error

#### 2. User Login

- **Endpoint**: `POST /auth/login`
- **Description**: Authenticate user and generate JWT token
- **Middleware**: `LoginValidation`
- **Input Requirements**:
  ```json
  {
    "email": "string (required)",
    "password": "string (required)"
  }
  ```
- **Success Response** (201):
  ```json
  {
    "msg": "Login is Sucessfull"
  }
  ```
- **Token Storage**: JWT token is automatically stored in HTTP-only cookie named "token"
- **Error Responses**:
  - `404`: Missing fields or user not found
  - `404`: Invalid password
  - `500`: Server error

### Dashboard Routes (`/dashboard`)

#### 1. Get User Posts

- **Endpoint**: `GET /dashboard/mypost/:id`
- **Description**: Retrieve posts for a specific user
- **Middleware**: `JwtValidation` (requires authentication)
- **Input Requirements**:
  - **URL Parameter**: `id` - User's MongoDB ObjectId
  - **Authentication**: Valid JWT token in cookies
- **Success Response** (201):
  ```json
  {
    "msg": "All post"
  }
  ```
- **Error Responses**:
  - `404`: User must be logged in (no token)
  - `401`: Invalid or expired token

## Authentication Flow

### How JWT Authentication Works

1. **Registration**: User creates account with hashed password
2. **Login**: User provides credentials, receives JWT token in cookie
3. **Protected Routes**: Token is validated on each request to protected endpoints
4. **Token Expiry**: Tokens expire after 1 hour (3600 seconds)

### Middleware Functions

#### RegisterValidation

- Validates required fields (name, email, password)
- Checks if user already exists in database
- Prevents duplicate registrations

#### LoginValidation

- Validates required fields (email, password)
- Verifies user exists in database
- Attaches user object to request for controller use

#### JwtValidation

- Extracts JWT token from cookies
- Verifies token signature and expiry
- Protects routes requiring authentication

## Database Schema

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

## Password Security

- Passwords are hashed using bcrypt with salt rounds of 10
- Original passwords are never stored in the database
- Password comparison is done using bcrypt's secure compare function

## Error Handling

The API uses standard HTTP status codes:

- `200/201`: Success
- `400`: Bad Request (validation errors)
- `404`: Not Found (missing resources/fields)
- `401`: Unauthorized (invalid tokens)
- `500`: Internal Server Error

## Dependencies

```json
{
  "bcrypt": "^6.0.0", // Password hashing
  "cookie-parser": "^1.4.7", // Cookie parsing
  "dotenv": "^17.2.1", // Environment variables
  "express": "^5.1.0", // Web framework
  "jsonwebtoken": "^9.0.2", // JWT tokens
  "mongoose": "^8.16.4" // MongoDB ODM
}
```

## Example Usage

### Register a new user:

```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Login:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Access protected route:

```bash
curl -X GET http://localhost:3000/dashboard/mypost/USER_ID \
  --cookie-jar cookies.txt \
  --cookie cookies.txt
```

## Notes

- All timestamps are automatically managed by MongoDB
- JWT tokens are stored as HTTP-only cookies for security
- The application uses MongoDB's default ObjectId for user identification
- Password validation and strength requirements can be added as needed
- CORS configuration may be needed for frontend integration

## Future Enhancements

- Blog post CRUD operations
- User profile management
- Comment system
- File upload for images
- Email verification
- Password reset functionality
- Pagination for posts
- Search functionality
