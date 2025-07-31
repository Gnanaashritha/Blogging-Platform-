const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 20
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    avatarImage: {
      type: String,
      required: false,
      default: "https://i.pinimg.com/736x/0c/42/80/0c42806fe2eb2ca0757344eb1f041eb6.jpg"
    }
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  const user = this
  
  if (!user.isModified("password")) return next()

  const hash = await bcrypt.hash(user.password, 12)
  user.password = hash

  next()
})

// Method to compare password
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}


const User = mongoose.model("User", UserSchema)
module.exports = User