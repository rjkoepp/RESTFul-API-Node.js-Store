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
        .select('name price _id') // fields to be fetched, could also use "select(-__v)", minus will exclude __v
        .exec()
        .then(docs => {
            const response = { // larger scope of data
                count: docs.length,
                products: docs.map(docs => {
                    return { // could use spread, this is manual
                        name: docs.name,
                        price: docs.price,
                        _id: docs._id,
                        request: { // how to get more info
                            type: 'GET',
                            description: "Get's all products",
                            url: 'http://localhost:3000/products/' + docs._id
                        }
                    }
                }) // map to new aray // contains docs (the product information);
            };
            res.status(200).json(response);
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
            message: 'Creating product successfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET', // subsequent request for more info
                    url: 'http://localhost:3000/products/' + result._id
                }
            }

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
    // const updateOps = {};
    // let updateOps = req.body[0]

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value; // allows for diff types of patch requests
    }
    // for (const key of Object.keys(req.body)) {

    //     updateOps[key] = req.body[key];
    // }
    // for (const key in req.body) {

    //     updateOps[key] = req.body[key];
    // }
    console.log(updateOps);
    console.log(id);

    Product.findOneAndUpdate({ _id: id }, { $set: updateOps }) // $set, compare key value pairs and how to update
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    message: "yeah, this doesn't work",
                    url: 'http://localhost:3000/products/' + id
                }
            });
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