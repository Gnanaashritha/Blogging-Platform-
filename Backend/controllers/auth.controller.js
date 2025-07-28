const User = require("../models/user.model.js");
const { handleGenerateToken } = require("../service/TokenGenerator.js");

async function handleSignup(req, res) {
  try {
    const userDetails = req.user;
    const userinfo = new User(userDetails);
    const savedUser = await userinfo.save();

    // remove unwanted items from response
    savedUser.password = undefined;
    savedUser.createdAt = undefined;
    savedUser.updatedAt = undefined;
    savedUser.__v = undefined;

    return res.status(201).json(savedUser);
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

async function handleLogin(req, res) {
  try {
    const user = req.user;
    const isPasswordValid = await user.comparePassword(req.body.password);

    if (isPasswordValid == false) {
      return res.status(404).json({ msg: "Invalid Password" });
    }

    const token = await handleGenerateToken(user._id, user.name, user.email);

    // remove unwanted items from response
    user.password = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;
    user.__v = undefined;

    return res
      .cookie("token", token)
      .status(201)
      .json({ msg: "Login is Sucessfull", user, token });

  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

module.exports = {
  handleLogin,
  handleSignup,
};
