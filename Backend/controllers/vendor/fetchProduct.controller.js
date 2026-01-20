const mongoose = require("mongoose");
const ProductDB = require("../../models/ProductDB");

const fetchProduct = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const vendorId = new mongoose.Types.ObjectId(req.user.id);
    const productFetched = await ProductDB.find({ vendorId })
      .sort({ createdAt: -1 })
      .skip(skip)
          .limit(limit);
      const totalCount = await ProductDB.countDocuments({vendorId})
    if (!productFetched || productFetched.length == 0)
      return res.status(200).json({ message: "no product found" });
       res.status(200).json({
         success: true,
         productFetched,
         pagination: {
           totalCount,
           currentPage: page,
           totalPages: Math.ceil(totalCount / limit),
           limit,
         },
       });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = fetchProduct;
