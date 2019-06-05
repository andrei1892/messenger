const jwt = require("jsonwebtoken");
// const USER = require("../model/usersTemplate");
const CONFIG = require("../config");

const auth_middleware = (req, res, next) => {
  if (req.headers["token"] === undefined)
    res.status(401).json({ message: "missing token" });
  else {
    jwt.verify(req.headers["token"], CONFIG.JWT_SECRET_KEY, (err, payload) => {
      if (err) res.status(401);
      else next();
    });
  }
};

module.exports = auth_middleware;
