const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const {auth} = require('../config/auth');

// Loading Model
require('../models/Product');
const Product = mongoose.model('products');


router.get('/add',(req,res)=>{
    res.render('admin/add');
});

    // SET STORAGE
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'public/uploads/')
        },
        filename: function (req, file, cb) {
          cb(null, path.basename(file.originalname, '.jpg') + '-' + Date.now() + path.extname(file.originalname));
        }
      })
      var upload = multer({ storage: storage })

router.post('/add',upload.single('file'),(req,res)=>{
    let name = req.body.name;
    let category = req.body.category;
    let seller = req.body.seller;
    let file = req.file.filename;
    let description = req.body.description;
    let price = req.body.price;
    let errors = [];

    if(!name){
        errors.push({msg: 'Please Insert name'});
    }
    if(!category){
        errors.push({msg: 'Please Insert Category'});
    }
    if(!price){
        errors.push({msg: 'Please Insert Price'});
    }
    if(!seller){
        errors.push({msg: 'Please Insert Seller name'});
    }
    if(!description){
        errors.push({msg: 'Please Enter Description'});
    }
    if(errors.length > 0){
        res.status(400).json(errors);
    }else{
        const newProduct = {
            name: name,
            category: category,
            price: price,
            image: file,
            seller: seller,
            description: description
        }
        Product(newProduct).save().then(product=>{
            req.flash('success_msg','Product Added Successfully');
            res.redirect('/dashboard/add');
        })
    }
});











module.exports = router;