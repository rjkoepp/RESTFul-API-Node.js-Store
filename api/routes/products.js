// handles product related routes 

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

// handles incoming get requests
// second arg is "handler"
router.get('/', (req, res, next) => {
    // handle get requests here
    Product.find() //with no arguments, will find all objects
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
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
        res.status(201).json({
            message: 'Handling POST requests to /products',
            createdProduct: result, // return
        })
            .catch(err => console.log(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            })); // save is provided by mongoose to save to data base (used on mongoose models)
    });
});

// : is a var

router.get('/:productId', (req, res, next) => {

    const id = req.params.productId;
    Product.findById(id)// prommise (runs async)
        .exec()
        .then(doc => {
            console.log("From database ", doc); // doc refers to fetched document from database
            // bc async and we want it to run after we know the method is done, we call in here
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(400).json({ message: 'No valid entry found for provided id' });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    // want to send response after we got data

});

// only need to return a res.status if there is possible bleed thru

router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value; // allows for diff types of patch requests
    }
    Product.update({ _id: id }, { $set: updateOps }) // $set, compare key value pairs and how to update
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:productID', (req, res, next) => {
    const id = req.params.productId;

    Product.findOneAndRemove(id) // remove any products with this id
        .exec() // "gets real promise?"
        .then(result => {
            if (result === null) {
                console.log("the product is null");
            }
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;