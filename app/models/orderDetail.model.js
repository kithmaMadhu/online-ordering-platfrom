const sql = require("./db.js");

const OrderDetail = function(order) {
  this.order_id = order.order_id;
  this.product_id = order.product_id;
  this.quantity = order.quantity;
};

OrderDetail.orderProduct = (newOrder, result) => {
  sql.query("INSERT INTO order_details SET ?", newOrder, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created ordered product: ", { id: res.insertId, ...newOrder });
    result(null, { id: res.insertId, ...newOrder });
  });
};

module.exports = OrderDetail;

