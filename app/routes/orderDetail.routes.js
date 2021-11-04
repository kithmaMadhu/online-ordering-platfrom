module.exports = app => {
    const orderDetail = require("../controllers/orderDetail.controller.js");
  
    // Retrieve all orders
    app.post("/orderProducts", orderDetail.orderProducts);
};