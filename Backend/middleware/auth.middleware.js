const User = require('../models/user.model.js')
const jwt = require('jsonwebtoken')

// middleware for jwt validation
async function authMiddleware(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    return res.status(404).json({ msg: "User must be login" });
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!decodedToken) {
    return res.status(403).json({ msg: "Invalid or expired token" });
  }

  req.user = decodedToken;
  next()
}



// middleware for register data validation
async function RegisterValidation(req, res, next) {
  const { username, fullName, email, password } = req.body;
  if (!username || !fullName || !email || !password) {
    return res.status(404).json({ error: "All Fields are required" });
  }

  const weirdUsernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!weirdUsernameRegex.test(username)) {
    return res.status(400).json({ msg: "Username can only contain letters, numbers, and underscores" });
  }

  if (username.length < 6) {
    return res.status(400).json({ msg: "Username must be at least 6 characters" });
  }

  const weirdEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!weirdEmailRegex.test(email)) {
    return res.status(400).json({ msg: "Invalid email format" });
  }

  if (password.length < 8) {
    return res.status(400).json({ msg: "Password must be at least 8 characters" });
  }

  const [isUsernameAlreadyPresent, isEmailAlreadyPresent] = await Promise.all([
    User.findOne({ username }),
    User.findOne({ email }),
  ]);

  if (isUsernameAlreadyPresent || isEmailAlreadyPresent) {
    return res.status(409).json({ msg: 'Username or Email already exist' });
  }

  // store user info in req.user
  req.user = { username, fullName, email, password, }

  next()
}

// middleware for login data validation
async function LoginValidation(req, res, next) {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(404).json({ mag: "All fields are require" })
  }

  const weirdUsernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!weirdUsernameRegex.test(username)) {
    return res.status(400).json({ msg: "Username can only contain letters, numbers, and underscores" });
  }

  if (username.length < 6) {
    return res.status(400).json({ msg: "Username must be at least 6 characters" });
  }

  if (password.length < 8) {
    return res.status(400).json({ msg: "Password must be at least 8 characters" });
  }

  const isUservalid = await User.findOne({ username })
  if (!isUservalid) {
    return res.status(404).json({ msg: "User Not Found" })
  }

  req.user = isUservalid
  next()
}

module.exports = {
  authMiddleware,
  RegisterValidation,
  LoginValidation,
};
