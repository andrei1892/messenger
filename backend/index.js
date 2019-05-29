const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ROUTES = require("./src/view-routes/routes");

const app = express();
app.use(cors());
app.use(bodyParser());
app.use("/", ROUTES);
