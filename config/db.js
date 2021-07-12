const mongoose = require("mongoose");
const config = require("config");

module.exports = {
  DBconnect: () => {
    mongoose
      .connect(config.get("mongoDBURI"), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database Connected...");
      })
      .catch((err) => {
        console.log("Error database connection :" + err);
      });
  },
};
