var express = require('express');
var router = express.Router();
var modelCart = require('../models/model_cart');
var userRouter = require('../routes/users');

router.post('/', async function(req, res){
    if(req.session.User)
    {
        let user = req.session.User;
        let bill = await modelCart.checkBill(user.id);
        res.render('thanh-toan.ejs', {user, bill});
    }
})

router.get('/', async function(req, res){
    if(req.session.User)
    {
        let user = req.session.User;
        let bill = await modelCart.checkBill(user.id);
        res.render('thanh-toan.ejs', {user, bill});
    }
})

router.post('/dat-hang', async function(req, res){
    if(req.session.User)
    {
        let user = req.session.User;
        let bill = await modelCart.checkBill(user.id);
        modelCart.UpdateBill(bill.idBill, bill.discount, bill.totalProduct, bill.total, 1);
        let UpdateBill = await modelCart.checkBill(user.id);
        res.render('thanh-toan.ejs', {user, bill: UpdateBill});
    }
})


module.exports = router;