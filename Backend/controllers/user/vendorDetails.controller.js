const vendorDB = require("../../models/vendorDB")
const mongoose = require("mongoose")
const vendorDetails = async (req, res) => {
    try {
        const vendorId = req.params.id
    const vendor = await vendorDB.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(vendorId) },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "vendorId",
          as: "products",
        },
      },
      {
        $addFields: { totalProducts: { $size: "$products" } },
      },
      {
        $project: {
          password: 0,
          __v: 0,
        },
      },
    ]); 
      if (!vendor) {
        return res.status(400).json({ message: "no vendor found" });
      }
      const views = await vendorDB.updateOne({ _id:vendorId }, { $inc: { views: 1 } })
      console.log(views);
      
      res.status(200).json({ vendor:vendor[0] });
    } catch (e) {
        res.status(500).json({message:e.message})
    }
}

module.exports = vendorDetails