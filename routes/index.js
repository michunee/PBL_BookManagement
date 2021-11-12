var express = require('express');
var router = express.Router();

// Vào trang đăng nhập
router.get('/', function(req, res, next) {
  res.render('dang-nhap.ejs');
});

router.get('/gio-hang/', async function(req, res, next) {
  res.render('gio-hang.ejs');
})

router.get('/thanh-toan', function(req, res, next) {
  res.render('thanh-toan.ejs');
})
module.exports = router;
