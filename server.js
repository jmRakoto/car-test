const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");
const app = express();
const routes = require("./routes");

dbConnection.DBconnect();
app.use(express.json());

app.use(
  cors({
    exposedHeaders: ["token"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  }),
);

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to car project</h1>`);
});

app.listen(4000, () => console.info(`Server running...`));
