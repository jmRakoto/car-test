const Car = require("../entity/Car");

class CarController {
  static getAllCar = async (req, res) => {
    try {
      // If connected user get car list with comments
      if (req.decoded) {
        const result = await Car.find().populate("comments");
        return res.status(200).send(result);
      } else {
        // If user isn't connected remove comments

        const result = await Car.find().select("-comments");
        return res.status(200).send(result);
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  static newCar = async (req, res) => {
    try {
      const { immatriculation } = req.body;
      const ifExistCar = await Car.findOne({ immatriculation });

      if (ifExistCar) {
        return res.status(400).json({ message: "Car already exist" });
      }

      let insertCar = new Car(req.body);
      const result = await insertCar.save();

      return res.status(200).send(result);
    } catch (err) {
      if (err.name == "ValidationError") {
        const key = Object.keys(err.errors);
        return res.status(400).json({ error: `${key} is required` });
      }

      return res.status(500).send(err);
    }
  };
}

module.exports = CarController;
