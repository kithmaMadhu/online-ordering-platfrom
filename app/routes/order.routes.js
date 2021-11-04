module.exports = app => {
    const orders = require("../controllers/order.controller.js");
  
    // Create a new order
    app.post("/orders", orders.create);
  
    // Retrieve all orders
    app.get("/orders", orders.findAll);

    // Retrieve count of products with same order_id in order_details
    app.get("/ordersProductCount", orders.findProductCount);
  
    // Retrieve next order id
    app.get("/getMaxOrderId", orders.findNextOrderId);

    // Retrieve a single order with orderId
    app.get("/orders/:orderId", orders.findOne);

    // Retrieve a single order with customerId
    app.get("/orders/customer/:customerId", orders.findByCustomer);
  
    // Update an order with orderId
    app.put("/orders/:orderId", orders.update);
  
    // Delete an order with orderId
    app.delete("/orders/:orderId", orders.delete);
  
    // Create a new order
    app.delete("/orders", orders.deleteAll);
};