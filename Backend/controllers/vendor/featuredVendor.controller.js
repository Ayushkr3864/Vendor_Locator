const vendorDB = require("../../models/vendorDB");

const featuredVendor = async (req, res) => {
  const { category, lat, long, distance = 5 } = req.query;
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const skip = (page - 1) * limit;

  if (!lat || !long) {
    if (category == "All" || category == "all") {
      const vendors = await vendorDB
        .find({ isProfileComplete: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await vendorDB.countDocuments();

      if (!vendors) return res.status(400).json({ message: "no vendor found" });

      return res.status(200).json({
        featuredVendor: vendors,
        pagination: {
          currentPage: page,
          total,
          totalPage: Math.ceil(total / limit),
        },
        limit,
      });
    }
    const vendors = await vendorDB
      .find({
        category: { $regex: category, $options: "i" },
        isProfileComplete: true,
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = vendors.length;

    if (!vendors || total == 0) {
      return res.status(404).json({
        message: "no vendor found",
        featuredVendor: vendors,
        total,
        totalPage: 1,
      });
    }

    return res.status(200).json({
      featuredVendor: vendors,
      pagination: {
        currentPage: page,
        total,
        totalPage: Math.ceil(total / limit),
      },
      limit,
    });
  }


  const geoQuery = {
    isProfileComplete: true,
  };

  if (category !== "All" && category !== "all") {
    geoQuery.category = { $regex: category, $options: "i" };
  }

  const vendors = await vendorDB.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(long), parseFloat(lat)], // [lng, lat]
        },
        distanceField: "distance",
        maxDistance: distance * 1000, // km → meters
        spherical: true,
        query: geoQuery,
        distanceMultiplier: 0.001, 
      },
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
      $addFields: {
        totalProducts: { $size: "$products" },
      },
    },
    { $skip: skip },
    { $limit: limit },
  ]);

  const total = vendors.length;

  if (!vendors || total === 0) {
    return res.status(404).json({
      message: "no vendor found",
      featuredVendor: [],
      total,
      totalPage: 1,
    });
  }

  return res.status(200).json({
    featuredVendor: vendors,
    pagination: {
      currentPage: page,
      total,
      totalPage: Math.ceil(total / limit),
    },
    limit,
  });
  
};

module.exports = featuredVendor;
