const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var cors = require("cors");

// parse requests of content-type: application/json
app.use(bodyParser.json());

app.use(cors());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application.." });
});

require("./app/routes/customer.routes.js")(app);
require("./app/routes/product.routes.js")(app);
require("./app/routes/order.routes.js")(app);
require("./app/routes/orderDetail.routes.js")(app);

// set port, listen for requests
app.listen(8000, () => {
  console.log("Server is running on port 8000.");
});

/* const app = require("./app");

app.listen(3000, () => console.log("server starting on port 3000!")); */
module.exports = app