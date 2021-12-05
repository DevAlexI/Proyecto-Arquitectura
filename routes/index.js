var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.send('<p>HTML Datamami</p>');
});

module.exports = router;
