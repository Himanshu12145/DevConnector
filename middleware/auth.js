const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //* Get Token form the header
  const token = req.header("x-auth-token");

  // *Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //* Verify for the token if there is one
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    // * if token is not valid
    res.status(401).json({ msg: "Token is not valid! " });
  }
};
