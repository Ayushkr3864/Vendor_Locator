const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  try {
     if (!req.cookies) {
       return res.status(401).json({
         success: false,
         message: "Cookies not available",
         isauthenticate:false
       });
     }
    const token = req.cookies.Token;
    console.log(token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access, token missing",
        isauthenticate: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach user data to request
    req.user = decoded;

    next(); // VERY IMPORTANT
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired please login again" })
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = isLoggedIn;
