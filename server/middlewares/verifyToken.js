import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;       // ✅ full access to user info (e.g., channelName)
    req.userId = decoded.id;  // ✅ backwards compatibility

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token." });
  }
};

export default verifyToken;
