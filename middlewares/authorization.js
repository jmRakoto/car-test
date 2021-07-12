module.exports = {
  isConnected(req, res, next) {
    if (!req.decoded) {
      return res.status(423).json({
        message: "Unauthorized",
      });
    }
    next();
  },
};
