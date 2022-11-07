const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const usuarios = require("./routes/users");
// const location = require("./routes/locations");


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/users", usuarios);
// app.use("/location", location);

app.use("*", (req, res) => {
  res.send("ketapaasaaandaaaaa");
});

app.listen(PORT, (req, res) => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});

  

module.exports = app;
