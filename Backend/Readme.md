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
   JWT_SECRET_KEY=Blogging@1234

   # add origins separated by comma to enable multiple origins
   # eg. ALLOWED_CORS_ORIGINS = http://localhost:8080,http://localhost:5173
   ALLOWED_CORS_ORIGINS = http://localhost:8080

   # Cloudinary Configuration (Required for image uploads)
   # Get these credentials from your Cloudinary Dashboard at https://cloudinary.com/console
   CLOUDINARY_CLOUD_NAME=your_cloud_name_here
   CLOUDINARY_API_KEY=your_api_key_here
   CLOUDINARY_API_SECRET=your_api_secret_here
   ```

### Cloudinary Setup

This application uses Cloudinary for image storage and management. To set up Cloudinary:

1. **Create a Cloudinary Account**:
   - Visit [cloudinary.com](https://cloudinary.com) and sign up for a free account
   - Free tier includes 25 GB storage and 25 GB monthly bandwidth

2. **Get Your Credentials**:
   - After logging in, go to your [Cloudinary Console Dashboard](https://cloudinary.com/console)
   - Find your account details in the "Account Details" section:
     - **Cloud Name**: Your unique cloud name (e.g., `dxample123`)
     - **API Key**: Your API key (e.g., `123456789012345`)
     - **API Secret**: Your API secret (keep this secure!)

3. **Configure Environment Variables**:
   - Copy these values to your `.env` file:
   ```
   CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
   CLOUDINARY_API_KEY=your_actual_api_key
   CLOUDINARY_API_SECRET=your_actual_api_secret
   ```



**Without Cloudinary credentials, image upload features will not work.**

4. Start the server:
   ```bash
   npm run dev
   ```
   To start the server for development, use `npm run dev` which will use `nodemon` to restart the server if there are any changes in the code. For production, use `npm run start`.

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
    "username": "string (required, unique)",
    "fullName": "string (required)",
    "email": "string (required, unique)",
    "password": "string (required)"
  }
  ```
- **Success Response** (201):
  ```json
  {
    "_id": "user_object_id",
    "username": "johndoe",
    "fullName": "John Doe",
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
    "username": "string (required)",
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

## Authentication Flow

### How JWT Authentication Works

1. **Registration**: User creates account with hashed password, once user is created a JWT token is generated and stored.
2. **Login**: User provides credentials, receives JWT token in cookie
3. **Protected Routes**: Token is validated on each request to protected endpoints
4. **Token Expiry**: Tokens expire after 1 hour (3600 seconds)

### Middleware Functions

#### RegisterValidation

- Validates required fields (username, fullName, email, password)
- Checks if user already exists in database
- Prevents duplicate registrations

#### LoginValidation

- Validates required fields (username, password)
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
  username: String (required, unique),
  fullName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

## Password Security

- Passwords are hashed using bcrypt.
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
  "bcrypt": "^6.0.0",
  "cloudinary": "^2.7.0",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^17.2.1",
  "express": "^5.1.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.16.4",
  "multer": "^2.0.2"
}
```

## Example Usage

### Register a new user:

```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Login:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
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
