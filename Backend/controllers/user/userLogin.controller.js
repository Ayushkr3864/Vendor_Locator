const User = require("../../models/UserDB");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
console.log(req.body);

    // 1️⃣ Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: "user",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("Token", token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true, // not accessible via JS
      secure: true,
    });

    // 6️⃣ Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error("User login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = userLogin;
