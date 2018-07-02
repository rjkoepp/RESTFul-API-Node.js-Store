// handles requests

const express = require('express');
const app = express();
const morgan = require('morgan'); // funnel all requests thru morgan, log requests
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products'); // takes to file !!!
const orderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb+srv://node-shop:' + process.env.MONGO_ATLAS_PW + '@node-rest-shop-1oq28.mongodb.net/test?retryWrites=true', (err) => {
    if (err) {
        console.log("Could not connect to MongoDB (DATA CENTER) ");
    } else {
        console.log("DATA CENTER - Connected")
    }
}); // CONNECTING TO MONGODB v. 3.6);

app.use(morgan('dev')); // logger middle ware (dev is form we want output)
app.use(bodyParser.urlencoded({ extended: false })); // body parser middle ware
app.use(bodyParser.json()); // extracts json data

// below prevents CORS Errors (won't encounter through Postman)
app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*'); // * is what client gets access
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        // brower always sends OPTIONS with a post or put request
        // checks if request is allowed
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); // all requests we plan to support
        return res.status(200).json({}); // empty object
    }
    next(); // next function
});

// anything starting with /products in the url is forward to products.js
app.use('/products', productRoutes); // middleware
app.use('/orders', orderRoutes); // middleware

// anything that made it past the two middlewares, no routes exist

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404; // no route found
    next(error); // forward error in place of original request 
}); // 'use' sets up middle ware thru which incoming requests go thru

// handles all errors thrown from anywhere in application
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;