'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.ordersGET = function ordersGET (req, res, next, pageSize, pageIndex, currentDate) {
  Default.ordersGET(pageSize, pageIndex, currentDate)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.ordersOrderIdPUT = function ordersOrderIdPUT (req, res, next, body, orderId) {
  Default.ordersOrderIdPUT(body, orderId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.ordersPOST = function ordersPOST (req, res, next, body) {
  Default.ordersPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.productsGET = function productsGET (req, res, next, pageSize, pageIndex) {
  Default.productsGET(pageSize, pageIndex)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.productsPOST = function productsPOST (req, res, next, body) {
  Default.productsPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.productsProductIdGET = function productsProductIdGET (req, res, next, productId) {
  Default.productsProductIdGET(productId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.productsProductIdPUT = function productsProductIdPUT (req, res, next, body, productId) {
  Default.productsProductIdPUT(body, productId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
