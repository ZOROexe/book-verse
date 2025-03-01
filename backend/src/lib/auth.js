import jwt from "jsonwebtoken";

export const authentication = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token required" });
  }
  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Please Login again" });
    req.user = user;
    next();
  });
};
