const User = require("../entity/User");

class UserController {
  static register = async (req, res) => {
    try {
      const { phone, email } = req.body;
      const ifExistUser = await User.findOne({ $or: [{ email }, { phone }] });
      if (ifExistUser) {
        return res.status(400).json({ message: "User already exist" });
      }

      let newUser = new User(req.body);
      newUser.password = newUser.hashPass(req.body.password);
      const result = await newUser.save();

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

module.exports = UserController;
