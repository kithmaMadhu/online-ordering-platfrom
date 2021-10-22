'use strict';


/**
 * View previous orders
 *
 * pageSize Integer The amount of previous orders returned (optional)
 * pageIndex Integer The page to return previous orders (optional)
 * currentDate date Current date (optional)
 * returns List
 **/
exports.ordersGET = function(pageSize,pageIndex,currentDate) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "orderId" : 4,
  "customerId" : 4,
  "orderDate" : "2021-01-01T00:00:00.000+00:00",
  "status" : "active"
}, {
  "orderId" : 4,
  "customerId" : 4,
  "orderDate" : "2021-01-01T00:00:00.000+00:00",
  "status" : "active"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Cancel an order
 *
 * body Orders_orderId_body 
 * orderId Integer The information about the order
 * no response value expected for this operation
 **/
exports.ordersOrderIdPUT = function(body,orderId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Place an order
 *
 * body Orders_body 
 * no response value expected for this operation
 **/
exports.ordersPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * View products
 *
 * pageSize Integer The amount of products returned (optional)
 * pageIndex Integer The page to return products (optional)
 * returns List
 **/
exports.productsGET = function(pageSize,pageIndex) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "unitPrice" : 15.5,
  "productId" : 4,
  "productName" : "John Doe",
  "unitsInStore" : 4
}, {
  "unitPrice" : 15.5,
  "productId" : 4,
  "productName" : "John Doe",
  "unitsInStore" : 4
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create a product
 *
 * body Products_body 
 * no response value expected for this operation
 **/
exports.productsPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * View detailed information about a given product
 *
 * productId Integer The information about the product
 * returns List
 **/
exports.productsProductIdGET = function(productId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "unitPrice" : 15.5,
  "productId" : 4,
  "productName" : "John Doe",
  "unitsInStore" : 4
}, {
  "unitPrice" : 15.5,
  "productId" : 4,
  "productName" : "John Doe",
  "unitsInStore" : 4
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a product/ Update units in store (when placing an order/ cancelling an order)
 *
 * body Products_productId_body 
 * productId Integer The information about the product
 * no response value expected for this operation
 **/
exports.productsProductIdPUT = function(body,productId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

