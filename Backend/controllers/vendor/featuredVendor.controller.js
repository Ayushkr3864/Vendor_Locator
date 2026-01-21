const vendorDB = require("../../models/vendorDB");
const featuredVendor = async (req, res) => {
  const  category  = req.query.category;
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const skip = (page - 1) * limit;
  const search =req.query.search
  

  if (category == "All" || category=="all") {
    const vendors = await vendorDB
      .find({isProfileComplete:true})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
      console.log(vendors);
    const total = await vendorDB.countDocuments();
    if (!vendors) return res.status(400).json({ message: "no vendor found" });
    res.status(200).json({
      featuredVendor: vendors,
      pagination: {
        currentPage: page,
        total,
        totalPage: Math.ceil(total / limit),
      },
      limit,
    });
    return
  }
  const vendors = await vendorDB
    .find({
      category: { $regex: category, $options: "i" },
      isProfileComplete: true,
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
    total = vendors.length ;
    if (!vendors || total == 0) {
        return res.status(404).json({message:"no vendor found",featuredVendor:vendors,total,totalPage:1})
    }
     res.status(200).json({
       featuredVendor: vendors,
       pagination: {
         currentPage: page,
         total,
         totalPage: Math.ceil(total / limit),
       },
       limit,
     });
};

module.exports = featuredVendor
