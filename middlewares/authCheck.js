const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.ACCESS_TOKEN_SECRET;

const authChecks = async (req, res, next) => {
  try {
    //Get the jwt token from the head
    const token = req.headers["authorization"]?.split(" ")[1];
    //   obtained data
    let decodedData;
    //   if there"s a token continue
    if (token) {
      decodedData = jwt.verify(token, secret);
      if (decodedData === undefined) {
        res.status(401).json({ message: "token error" });
      } else {
        req.user = decodedData;
      }
    }
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = authChecks;
