const express = require("express");
const router = express.Router();
const CarController = require("../controllers/CarControllers");
const token = require("../middlewares/jwt");

router.get("/", [token.checkToken], CarController.getAllCar);
router.post("/", CarController.newCar);

module.exports = router;
