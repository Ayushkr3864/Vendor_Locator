const cookie = require("cookie");

const Logout = async (req, res) => {
    res.clearCookie("Token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
     return res.status(200).json({
       success: true,
       message: "Logged out successfully",
     });
}

module.exports = Logout;