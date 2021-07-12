const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentControllers");
const token = require("../middlewares/jwt");
const authorization = require("../middlewares/authorization");

router.post(
  "/",
  [token.checkToken, authorization.isConnected],
  CommentController.addComment,
);

module.exports = router;
