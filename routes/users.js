var express = require('express');
var router = express.Router();
var db = require('../models/database')
var modelUser = require('../models/model_user');
const bcrypt = require("bcrypt");

// Trang chu
router.get('/trang-chu', function(req, res, next) {
  res.render('trang-chu.ejs')
});

// Dang nhap 
router.post('/dang-nhap', function(req, res, next) {
  let u = req.body.username;
  let p = req.body.password;
  let sql = `SELECT * FROM user WHERE username = '${u}' OR email = '${u}'`;
  db.query(sql, (err, rows) => {
      if (rows.length <= 0) {
          res.redirect("/users/dang-nhap");
          return;
      }
      let user = rows[0];
      let pass_fromdb = user.password;
      
      if(pass_fromdb == p)
        res.render('trang-chu.ejs')
      else
        res.render('dang-nhap.ejs')     
  });
});

router.get('/dang-nhap', function(req, res, next) {
  res.render('dang-nhap.ejs')
});

// Dang Ky

router.get('/dang-ky', function(req, res, next) {
  res.render('dang-ky.ejs')
});

router.post('/luu', function(req, res, next) {
  let ho = req.body.ho;
  let ten = req.body.ten;
  let u = req.body.username;
  let em = req.body.email;
  let phone = req.body.phone;
  let p = req.body.password;
  let rp = req.body.retypePassword;
  let address = req.body.address;

  if (p === rp && p != "") {

      let user_info = { ho: ho, ten: ten, email: em, username: u, password: p, phone: phone, address: address };

      let sql = 'INSERT INTO user SET ?';
      db.query(sql, user_info);
  } else {
      res.redirect("/users/dang-ky");
  }

  res.redirect("/users/thanh-cong");
})
router.get('/thanh-cong', function(req, res, next) {
  let message = "Đăng ký thành công";
  res.render('thanh-cong', { message: message })
})

// Quen mat khau
router.get('/quen-mat-khau', (req, res) => {
  res.render('quen-mat-khau', { message: '' });
})

// Lay lai mat khau
router.post('/quen-mat-khau', async(req, res) => {
  let email = req.body.email;
  let checkEmail = await modelUser.checkEmail(email); // Kiểm tra email có trong database hay không

  if (email == '') {
      let mess = "Mời bạn nhập email";
      res.render('quen-mat-khau', { message: mess });
  }
  if (checkEmail) { // Nếu email có trong database
      let mess = `Mật khẩu đã được gửi qua email ${email} của bạn!`;
      res.render('thanh-cong', { message: mess });
  } else {
      let mess = "Email không tồn tại!";
      res.render('quen-mat-khau', { message: mess });
  }
})

// Dang xuat
router.get('/dang-xuat', function(req, res, next) {
  res.redirect("/users/dang-nhap");
});


module.exports = router;
