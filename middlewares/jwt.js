const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = {
  // Generate token
  //The token is valid for 1 hour
  generateToken(obj) {
    return jwt.sign(
      { id: obj._id, email: obj.email },
      config.get("jwtSecret"),
      {
        expiresIn: "1h",
      },
    );
  },
  checkToken(req, res, next) {
    let token = req.headers["x-access-token"] || req.headers["authorization"];

    if (!token) {
      req.decoded = null;
      next();
      return;
    }

    token = token.replace("Bearer ", "");

    let jwtPayload;

    //Try to validate the token and get data
    try {
      jwtPayload = jwt.verify(token, config.get("jwtSecret"));
      res.locals.jwtPayload = jwtPayload;
      req.decoded = jwtPayload;
    } catch (error) {
      //If token is not valid, respond with 423 (locked)
      res.status(423).send(error.name);
      return;
    }

    next();
  },
};
