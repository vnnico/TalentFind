const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  const token = req.cookies["auth_token"];

  if (!token) {
    return res.status(400).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.HASH);
    console.log(decoded);
    req.user = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = isAuth;
