// handles product related routes 

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

// handles incoming get requests
// second arg is "handler"
router.get('/', (req, res, next) => {
    // handle get requests here
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
}); // anything that reaches this point, already has products 

router.post('/', (req, res, next) => {
    // handle post requests here

    // data to create and store to Mongo 
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    // a promise 
    product.save().then(result => {
        console.log(result);
    })
        .catch(err => console.log(err)); // save is provided by mongoose to save to data base (used on mongoose models)

    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: product, // return
    });
});

// : is a var

router.get('/:productId', (req, res, next) => {

    const id = req.params.productId;
    console.log('Entered the get');
    Product.findById(id)// prommise (runs async)
        .exec()
        .then(doc => {
            console.log(doc); // doc refers to fetched document from database
            // bc async and we want it to run after we know the method is done, we call in here
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    // want to send response after we got data

});

/*
router.get('/:productID', (req, res, next) => {

    const id = req.params.productID;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }

});
*/

// only need to return a res.status if there is possible bleed thru
router.patch('/:productID', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:productID', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    });
});


module.exports = router;