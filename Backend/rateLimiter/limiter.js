const { rateLimit } = require("express-rate-limit")
    
const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 5,
    
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 54,
    handler: (req, res) => {
        res
          .status(429)
          .json({
            success: false,
            message: "To many login attempts, try again in 5 minutes",
          });
    }
})

const registerLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 3,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 54,
    handler: (req, res) => {
        res
          .status(429)
          .json({
            success: false,
            message: "To many attempts, try again in 10 minutes",
          });
    }
})
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 60,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 54,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "To many attempts, try again in 1 minutes",
    });
  },
});

module.exports = {loginLimiter,registerLimiter,apiLimiter}