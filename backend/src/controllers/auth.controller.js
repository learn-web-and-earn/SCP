const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: true,
        message: "User already exists"
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);


    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    
    res.status(201).json({
      error: false,
      message: "User registered successfully",
      data: {
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error registering user"
    });
  }
}

module.exports = { registerUser };
