const Car = require("../entity/Car");
const Comment = require("../entity/Comment");

class CommentController {
  static addComment = async (req, res) => {
    try {
      const { car } = req.body;
      let insertComment = new Comment(req.body);
      const resultComment = await insertComment.save();

      await Car.findByIdAndUpdate(car, {
        $push: { comments: resultComment._id },
      });

      return res.status(200).send(resultComment);
    } catch (err) {
      if (err.name == "ValidationError") {
        const key = Object.keys(err.errors);
        return res.status(400).json({ error: `${key} is required` });
      }

      return res.status(500).send(err);
    }
  };
}

module.exports = CommentController;
