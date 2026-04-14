const ApiResponse = require("../utils/apiResponse");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config/env").secrets.JWT_SECRET;

exports.authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json(new ApiResponse(401, null, "Access Denied"));
    }

    const token = header.split(" ")[1];

    const decodedToken = jwt.verify(token, JWT_SECRET);

    req.id = decodedToken.id;
    req.role = decodedToken.role;

    next();
  } catch (error) {
    console.error("Error:", error);
    if (
      error?.name === "JsonWebTokenError" ||
      error?.name === "TokenExpiredError"
    ) {
      return res.status(401).json(new ApiResponse(401, null, "Access Denied"));
    }
    return res.status(500).json(new ApiResponse(500, null, "Server Error"));
  }
};
