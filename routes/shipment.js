var express = require('express');
var router = express.Router();
var shipmentController = require('../controllers/shipment.controller');

//var tasksController = require('../controllers/tasks.controller');
//var middleware = require('../middleware');


//router.get('/:id', tasksController.getById);

//router.use(middleware);

router
    .get('/change', shipmentController.changeStatus);

router  
    .get('/create', shipmentController.createShipment);




module.exports = router;
