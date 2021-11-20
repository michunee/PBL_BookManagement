var express = require('express');
var router = express.Router();
var modelCatalog = require('../models/model_catalog.js');
var detail = null;

router.get('/', async function(req, res, next)
{
        var listCategory = await modelCatalog.list();
        res.render("category-admin.ejs", {list:listCategory, detail:detail});
});

router.get('/detail:id', async function(req, res, next)
{
    var id = req.params.id;
    var detailCat =  await modelCatalog.detailCategory(id);
    var listCategory = await modelCatalog.list();
    res.render("category-admin.ejs", {detail:detailCat, list:listCategory});
});

router.get('/addnew', async function(req,res,next){
    var listCategory = await modelCatalog.list();
    res.render("category-admin.ejs", {detail:detail, list:listCategory});
});

router.post('/add-new-category', async function(req,res,next){
    let nameCategory = req.body.nameCat;
    let number = req.body.number;
    if(nameCategory != "" && number != "")
    {
        modelCatalog.create(nameCategory, number);
        res.redirect('/book/')
    }
});

router.post('/edit-category', async function(req, res, next){
    let idCat = req.body.idCat;
    let nameCat = req.body.nameCat;
    let number = req.body.number;
    if(nameCat != "" && number != "")
    {
        modelCatalog.update(idCat, nameCat, number);
        res.redirect("/book/");
    }
});

router.get('/delete/:id', function(req, res){
    let idCat = req.params.id;
    modelCatalog.delete(idCat);
    res.redirect("/book");
});

module.exports = router;

