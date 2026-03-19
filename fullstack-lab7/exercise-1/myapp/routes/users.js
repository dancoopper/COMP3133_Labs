var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/', urlencodedParser, function (req, res) {
  console.log(req.body); // logs the POST params
  res.send('POST received!');
});

module.exports = router;
