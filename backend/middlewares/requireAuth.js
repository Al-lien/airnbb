const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

async function requireAuth(req, res, next) {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }

  return null;
}

module.exports = requireAuth;
