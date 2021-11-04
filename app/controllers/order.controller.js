const Order = require("../models/order.model.js");

// Create and Save a new Order
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    // Create a Order
    const order = new Order({
        order_id: req.body.order_id,
        customer_id: req.body.customer_id,
        order_date: req.body.order_date,
        status: req.body.status,
    });

    // Save Order in the database
    Order.create(order, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the order."
        });
        else res.send(data);
    });
};

// Retrieve all orders from the database.
exports.findAll = (req, res) => {
    Order.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving orders."
          });
        else res.send(data);
    });
};

// Retrieve count of products with same order_id in order_details
exports.findProductCount = (req, res) => {
  Order.getProductCount((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving orders products count."
        });
      else res.send(data);
  });
};

// Find next order id
exports.findNextOrderId = (req, res) => {
  Order.getMaxOrderId((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving orders id."
        });
      else res.send(data);
  });
};

// Find a single order with a orderId
exports.findOne = (req, res) => {
    Order.findById(req.params.orderId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found order with id ${req.params.orderId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving order with id " + req.params.orderId
            });
          }
        } else res.send(data);
    });
};

// Find a single order with a customerId
exports.findByCustomer = (req, res) => {
    Order.findByCustomerId(req.params.customerId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found order with customer id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving order with customer id " + req.params.customerId
            });
          }
        } else res.send(data);
    });
};

// Update a order identified by the orderId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Order.updateById(
    req.params.orderId,
    new Order(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found order with id ${req.params.orderId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating order with id " + req.params.orderId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a order with the specified orderId in the request
exports.delete = (req, res) => {
    Order.remove(req.params.orderId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found order with id ${req.params.orderId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete order with id " + req.params.orderId
            });
          }
        } else res.send({ message: `order was deleted successfully!` });
    });
};

// Delete all orders from the database.
exports.deleteAll = (req, res) => {
    Order.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all orders."
          });
        else res.send({ message: `All orders were deleted successfully!` });
    });
};