var express = require('express');
var router = express.Router();
var paymentController = require('../controllers/payment.controller');
var middleware = require('../middleware');


//router.use(middleware);

router
    .get('/promos', paymentController.getPromos);

module.exports = router;
var express = require('express');
var router = express.Router();
var paymentController = require('../controllers/payment.controller');
var middleware = require('../middleware');


//router.use(middleware);

router
    .get('/discounts', paymentController.applyDiscount);

router
    .get('/promos', paymentController.getPromos);

module.exports = router;
