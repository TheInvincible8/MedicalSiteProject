const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Loading Model
require('../models/Product');
const Product = mongoose.model('products');



router.get('/',(req,res)=>{
    Product.find({}).sort('').then(products=>{
        if(!products){
            req.flash('err_msg','No products found');
        }
        // res.status(200).json(products);
        res.render('products',{
            products: products
        })
    });
});

router.get('/view/:id', (req, res) => {
    var id = req.params.id;
    Product.findById(id).then(product => {
        res.render('view', {
            product: product
        })
    });
});


router.get('/view/buy/:id', (req, res) => {
    var id = req.params.id;
    Product.findById(id).then(product => {
        res.render('buy', {
            product: product
        })
    });
});







module.exports = router;