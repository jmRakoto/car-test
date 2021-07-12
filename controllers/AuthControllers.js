const User = require("../entity/User");
const jwt = require("../middlewares/jwt");

class AuthController {
  static login = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "All field is required" });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Wrong email" });
      }

      if (!user.comparePass(password)) {
        return res.status(400).json({ message: "Wrong password" });
      }

      return res.status(200).json({
        token: jwt.generateToken(user),
        email: user._doc.email,
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  };
}

module.exports = AuthController;
