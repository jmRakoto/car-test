const router = require("express").Router();
const userRoutes = require("./user");
const authRoutes = require("./auth");
const carRoutes = require("./car");
const commentRoutes = require("./comment");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/car", carRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
