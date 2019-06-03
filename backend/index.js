const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ROUTES = require("./src/view-routes/routes");
const CONFIG = require("./src/config");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(ROUTES);

app.listen(CONFIG.PORT, ()=>console.log("Server up and running, waiting for requests"))