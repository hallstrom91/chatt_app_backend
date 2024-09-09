require("dotenv").config({ path: [".env.development.local", ".env"] });
const jwt = require("jsonwebtoken");

/*
=====================================
GENERATE JWT TOKEN FUNCTION
=====================================
*/
const generateToken = (payload) => {
  const secretKey = process.env.JWT_SECRET;
  const options = { expiresIn: "1h" };

  const token = jwt.sign(
    {
      userId: payload._id,
      username: payload.username,
      avatar: payload.avatar,
      email: payload.email,
    },
    secretKey,
    options
  );

  return token;
};

/*
=====================================
VALIDATE JWT TOKEN FUNCTION
=====================================
*/
const validateJwtToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // format - "Bearer <token>""

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    return res
      .status(500)
      .json({ message: "Internal server error - with JWT env variabel" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { generateToken, validateJwtToken };
