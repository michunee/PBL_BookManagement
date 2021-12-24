var express = require('express');
var router = express.Router();
var db = require('../models/database')
var modelUser = require('../models/model_user');
var modelCart = require('../models/model_cart');
const bcrypt = require("bcrypt");


/* GET users listing. */
router.get('/tai-khoan', async function(req, res, next) {
  if (req.session.User) {
    let idUser = (req.session.User).id;
    bill = await modelCart.BillCompletedByIDUser(idUser);
    res.render("my-account.ejs", { user: req.session.User, bill:bill });
  }
});

router.get('/don-hang:id', async function(req, res, next){
  let idBill = req.params.id;
  if(req.session.User)
  {
    let listPro = await modelCart.list(idBill);
    let bill = await modelCart.GetBillByIDBill(idBill);
    res.render("chi-tiet-don-hang.ejs", {user: req.session.User, listPro:listPro, bill:bill})
  }
})

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
      {
        req.session.User = {
          id: user.idUser,
          username: user.username,
          ho: user.ho,
          ten: user.ten,
          phone: user.phone,
          email: user.email,
          address: user.address,
          role : user.role
        };
        if(user.role == 1)
        {
          res.redirect("/sach/");
        }
        else
          res.redirect("/san-pham/trang-chu");
      }
      else
        res.render('dang-nhap.ejs')  
  });
});

router.get('/dang-nhap', function(req, res, next) {
  res.render('dang-nhap.ejs')
});

// Dang Ky

router.get('/dang-ky', function(req, res, next) {
  res.render('dang-ky.ejs', {message : '',message1 : '', message2 : '', message3 : ''})
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
  let sql = `SELECT * FROM user WHERE username = '${u}'`;
  let sql1 = `SELECT * FROM user WHERE email = '${em}'`;
  db.query(sql, (err, rows) => {
    if (rows.length > 0) {
      let mess = "Tên đăng nhập đã có người dùng!";
      res.render('dang-ky.ejs', { message : '',message1 : mess, message2 : '', message3 : '' });
      return;
    }
  });
  db.query(sql1, (err, rows) => {
    if (rows.length > 0) {
      let mess = "Email đã có người dùng!";
      res.render('dang-ky.ejs', { message : '',message1 : '', message2 : mess, message3 : '' });
      return;
    }
    if (p === rp && p != "" && u!="" && ho!="" && ten!="" && em!="" && phone!="" && address!="") {
      
      let user_info = { ho: ho, ten: ten, email: em, username: u, password: p, phone: phone, address: address };
      
      let sql = 'INSERT INTO user SET ?';
      db.query(sql, user_info);
      res.redirect("/users/thanh-cong");
    }
    else if(p != rp)
    {
      let mess = "Mật khẩu không trùng khớp!";
      res.render('dang-ky.ejs', {message : '',message1 : '', message2 : '', message3 : mess});
    }
    else {
      let mess = "Vui lòng nhập đầy đủ thông tin!";
      res.render('dang-ky.ejs', {message : mess,message1 : '', message2 : '', message3 : ''});
    }  
  });
  
  
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

// Doi mat khau
router.post('/doi-mat-khau', function(req, res, next) {
  let password = req.body.password;
  let newPassword = req.body.newPassword;
  let confirmPassword = req.body.confirmPassword;
  let u = req.session.User.username;
  console.log(u)
  let sql = 'SELECT * FROM user WHERE username = ?';
  db.query(sql, [u], (err, rows) => {
      if (rows.length <= 0) { res.redirect("/users/error"); return; }
      let user = rows[0];
      let pass_fromdb = user.password;
      if (pass_fromdb == password) {
          if (newPassword === confirmPassword && password != "" && confirmPassword != "") {
              let sql2 = `UPDATE user SET password='${newPassword}' WHERE username LIKE '%${u}%'`;
              db.query(sql2, (err, result) => {
                  console.log('Update success');
                  let mess = "Đổi mật khẩu thành công";
                  res.render('thong-bao-thay-doi', { message: mess })
              });
          }
          else {
            let mess = "Mật khẩu không trùng khớp!";
            res.render('thong-bao-thay-doi', { message: mess });
          }
      }
      else {
        let mess = "Sai mật khẩu!";
        res.render('thong-bao-thay-doi', { message: mess });
    }
  });
});

router.post('/update', function(req, res, next) {
  let ho = req.body.ho;
  let ten = req.body.ten;
  let em = req.body.email;
  let phone = req.body.phone;
  let address = req.body.address;
  let u = req.session.User.username;

  if(ho==""||ten==""||em==""||phone==""||address=="")
  {
    let mess = "Vui lòng nhập đầy đủ thông tin thay đổi!"
    res.render('thong-bao-thay-doi', { message: mess })
  }
  else{
    let sql = `UPDATE user SET ho='${ho}', ten='${ten}', email='${em}', phone='${phone}', address='${address}' WHERE username LIKE '%${u}%'`;
    db.query(sql, (err, result) => {
    console.log('Update success');
    let mess = "Cập nhật tài khoản thành công";
    res.render('thong-bao-thay-doi', { message: mess })
  
  });}
});

////////////////////////////////ADMIN//////////////////////////////////////////

router.get('/tai-khoan-admin', function(req, res, next) {
  if (req.session.User) {
    res.render("my-account-admin.ejs", { user: req.session.User });
  }
});

// Doi mat khau
router.post('/doi-mat-khau-admin', function(req, res, next) {
  let password = req.body.password;
  let newPassword = req.body.newPassword;
  let confirmPassword = req.body.confirmPassword;
  let u = req.session.User.username;
  console.log(u)
  let sql = 'SELECT * FROM user WHERE username = ?';
  db.query(sql, [u], (err, rows) => {
      if (rows.length <= 0) { res.redirect("/users/error"); return; }
      let user = rows[0];
      let pass_fromdb = user.password;
      if (pass_fromdb == password) {
          if (newPassword === confirmPassword && password != "" && confirmPassword != "") {
              let sql2 = `UPDATE user SET password='${newPassword}' WHERE username LIKE '%${u}%'`;
              db.query(sql2, (err, result) => {
                  console.log('Update success');
                  let mess = "Đổi mật khẩu thành công";
                  res.render('thong-bao-thay-doi-admin', { message: mess })
              });
          }
          else {
            let mess = "Mật khẩu không trùng khớp!";
            res.render('thong-bao-thay-doi-admin', { message: mess });
          }
      }
      else {
        let mess = "Sai mật khẩu!";
        res.render('thong-bao-thay-doi-admin', { message: mess });
    }
  });
});

router.post('/update-admin', function(req, res, next) {
  let ho = req.body.ho;
  let ten = req.body.ten;
  let em = req.body.email;
  let phone = req.body.phone;
  let address = req.body.address;
  let u = req.session.User.username;

  if(ho==""||ten==""||em==""||phone==""||address=="")
  {
    let mess = "Vui lòng nhập đầy đủ thông tin thay đổi!"
    res.render('thong-bao-thay-doi-admin', { message: mess })
  }
  else{
    let sql = `UPDATE user SET ho='${ho}', ten='${ten}', email='${em}', phone='${phone}', address='${address}' WHERE username LIKE '%${u}%'`;
    db.query(sql, (err, result) => {
    console.log('Update success');
    let mess = "Cập nhật tài khoản thành công";
    res.render('thong-bao-thay-doi-admin', { message: mess })
  
  });}
});

router.get('/quan-ly', async function(req, res, next) {
  let listClient = await modelUser.listClient();
  let listAdmin = await modelUser.listAdmin();
  res.render('quan-ly-tai-khoan.ejs',{listClient : listClient, listAdmin : listAdmin})
});

router.get('/dang-ky-admin', function(req, res, next) {
  res.render('dang-ky-admin.ejs', {message : '', message1 : '', message2 : '',message3 : ''})
});

router.post('/luu-admin', function(req, res, next) {
  let ho = req.body.ho;
  let ten = req.body.ten;
  let u = req.body.username;
  let em = req.body.email;
  let phone = req.body.phone;
  let p = req.body.password;
  let rp = req.body.retypePassword;
  let address = req.body.address;
  let sql = `SELECT * FROM user WHERE username = '${u}'`;
  let sql1 = `SELECT * FROM user WHERE email = '${em}'`;
  db.query(sql, (err, rows) => {
    if (rows.length > 0) {
      let mess = "Tên đăng nhập đã có người dùng!";
      res.render('dang-ky-admin.ejs', { message : '',message1 : mess, message2 : '', message3 : '' });
      return;
    }
  });
  
  db.query(sql1, (err, rows) => {
    if (rows.length > 0) {
      let mess = "Email đã có người dùng!";
      res.render('dang-ky-admin.ejs', { message : '', message1 : '', message2 : mess,message3 : '' });
      return;
      
    }
    if (p === rp && p != "" && u!="" && ho!="" && ten!="" && em!="" && phone!="" && address!="") {
      
      let user_info = { ho: ho, ten: ten, email: em, username: u, password: p, phone: phone, address: address };
      
      let sql = `INSERT INTO user SET username ='${u}', password ='${p}',email ='${em}',ho ='${ho}',ten ='${ten}',address ='${address}',phone ='${phone}',role = 1`;
      db.query(sql, user_info);
      res.redirect("/users/thanh-cong-admin");
    }
    else if(p != rp)
    {
      let mess = "Mật khẩu không trùng khớp!";
      res.render('dang-ky-admin.ejs', {message : '', message1 : '', message2 : '',message3 : mess});
    }
    else {
      let mess = "Vui lòng nhập đầy đủ thông tin!";
      res.render('dang-ky-admin.ejs', {message : mess ,message1 : '', message2 : '',message3 : ''});
    }  
  });
  
})

router.get('/thanh-cong-admin', function(req, res, next) {
  let message = "Thêm admin thành công";
  res.render('thong-bao-thay-doi-admin', { message: message })
})

router.get('/xoa/:idUser', async function(req, res){
  let idUser = req.params.idUser;
  modelUser.DeleteUser(idUser);
  res.redirect('/users/quan-ly');
})

router.get('/reset-pass/:idUser', async function(req, res){
  let idUser = req.params.idUser;
  let sql = `UPDATE user SET password = 1 WHERE idUser = '${idUser}'`;
  db.query(sql, (err, result) => {
  console.log('Reset success');
  res.redirect('/users/quan-ly');
  });
})

module.exports = router;
