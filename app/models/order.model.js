const sql = require("./db.js");

// constructor
const Order = function(order) {
  this.order_id = order.order_id;
  this.customer_id = order.customer_id;
  this.order_date = order.order_date;
  this.status = order.status;
};

Order.create = (newOrder, result) => {
  sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created product: ", { id: res.insertId, ...newOrder });
    result(null, { id: res.insertId, ...newOrder });
  });
};

Order.findById = (orderId, result) => {
  sql.query(`SELECT * FROM orders WHERE order_id = ${orderId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found order: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found order with the id
    result({ kind: "not_found" }, null);
  });
};

Order.findByCustomerId = (customerId, result) => {
    sql.query(`SELECT * FROM orders WHERE customer_id = ${customerId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found order: ", res);
        result(null, res);
        return;
      }
  
      // not found order with the customer id
      result({ kind: "not_found" }, null);
    });
};

Order.getProductCount = result => {
  sql.query("SELECT order_id, count(order_id) AS product_count from order_details group by order_id order by order_id asc;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("orders: ", res);
    result(null, res);
  });
};

Order.getMaxOrderId = result => {
  sql.query("SELECT max(order_id) FROM orders", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("max order id: ", res);
    result(null, res);
  });
};

Order.getAll = result => {
  sql.query("SELECT orders.order_id, orders.order_date, orders.status, order_details.product_id, order_details.quantity, customers.customer_id, customers.customer_name, customers.address, customers.email, customers.mobile_num, products.product_name, products.unit_price, products.units_in_store, products.image FROM orders JOIN order_details ON orders.order_id = order_details.order_id JOIN customers ON orders.customer_id = customers.customer_id JOIN products ON products.product_id = order_details.product_id WHERE orders.status = 'active' order by order_id asc", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("orders: ", res);
    result(null, res);
  });
};

Order.updateById = (id, order, result) => {
  sql.query(
    "UPDATE orders SET customer_id = ?, status = ? WHERE order_id = ?",
    [order.customer_id, order.status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found order with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated order: ", { id: id, ...order });
      result(null, { id: id, ...order });
    }
  );
};

Order.remove = (id, result) => {
  sql.query("DELETE FROM orders WHERE order_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found order with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted order with id: ", id);
    result(null, res);
  });
};

Order.removeAll = result => {
  sql.query("DELETE FROM orders", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} orders`);
    result(null, res);
  });
};

module.exports = Order;