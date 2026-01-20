const Authenticate = (req, res, next) => {
  console.log(req.user);
  if (req.user.role !== "vendor") {
    return res.status(404).json({
      success: false,
      message: "Access denied",
      isauthenticate: false,
    });
  }
  res.status(200).json({
    success: true,
    isauthenticate: true,
    role:"vendor"
  });
};
module.exports = Authenticate;
