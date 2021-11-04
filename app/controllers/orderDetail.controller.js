const OrderDetail = require("../models/orderDetail.model.js");

// Create and Save a ordered product
exports.orderProducts = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
  
    // Create a Order
    const order = new OrderDetail({
        order_id: req.body.order_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity
    });
  
    // Save Order in the database
    OrderDetail.orderProduct(order, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the order."
        });
        else res.send(data);
    });
  };