var express = require('express');
var router = express.Router();
var modelCart = require('../models/model_cart');
var userRouter = require('../routes/users');

// Vào trang đăng nhập
router.get('/', function(req, res, next) {
  res.render('dang-nhap.ejs');
});

router.get('/gio-hang/', async function(req, res, next) {
  let user = req.session.User;
  let bill = await modelCart.checkBill(user.id); 
  let idCart = 0;
  if(bill != null)
  {
    idCart = bill.idCart;
  }
  let listPro = await modelCart.list(idCart);
  res.render('gio-hang.ejs', {listPro:listPro, bill});
})

router.get('/thanh-toan/', async function(req, res, next) {
  if(req.session.User)
    {
        let user = req.session.User;
        let bill = await modelCart.checkBill(user.id);
        res.render('thanh-toan.ejs', {user, bill});
    }
})
module.exports = router;
