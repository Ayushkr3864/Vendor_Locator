const isVendor = (req, res, next) => {
    if (req.user.role !== "vendor") {
      return  res.status(404).json({success:false,message:"Access denied",isauthenticate:false,role:"user"})
    }
    next();
}
module.exports = isVendor;