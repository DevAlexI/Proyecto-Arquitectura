var express = require('express');
var router = express.Router();
var opsController = require('../controllers/operations.controller');

//var tasksController = require('../controllers/tasks.controller');
//var middleware = require('../middleware');


//router.get('/:id', tasksController.getById);

//router.use(middleware);

router
    .get('/sum', opsController.sum);

router
    .get('/substract', opsController.substract);

router
    .get('/multiply', opsController.multiply);

router
    .get('/divide', opsController.divide);

module.exports = router;
