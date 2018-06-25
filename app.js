// handles requests

const express = require('express');
const app = express();
const morgan = require('morgan'); // funnel all requests thru morgan, log requests

const productRoutes = require('./api/routes/products'); // takes to file !!!
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));

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
app.use((error, req, res, next ) => {

    res.status(error.status || 500);
    res.json ({
        error: {
            message: error.message
        }
    });

}); 
module.exports = app;


// request, response, next (function)--> passes request along 
// // 
// app.use((req, res, next) => { 

//     // sends json response with status code of 200
//     res.status(200).json({
//         // javascript object
//         message: 'It works!'

//     }); 

// }); // 'use' sets up middle ware thru which incoming requests go thru
