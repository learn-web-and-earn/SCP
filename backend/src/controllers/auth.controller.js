const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: true,
        message: "All fields are required"
      });
    }

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

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });


    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    res.status(201).json({
      error: false,
      message: `Welcome ${user.name}! Your account has been created successfully.`,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error registering user"
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: true,
        message: "Invalid email or password"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: true,
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    res.status(200).json({
      error: false,
      message: `Welcome back ${user.name}!`,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      },
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Error registering user"
    });
  }
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    error: false,
    message: "User logged out successfully"
  });
}

module.exports = { registerUser, loginUser, logoutUser };
