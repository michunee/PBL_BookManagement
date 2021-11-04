var express = require('express');
var router = express.Router();

// Vào trang đăng nhập
router.get('/', function(req, res, next) {
  res.render('dang-nhap.ejs');
});

module.exports = router;
