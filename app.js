// handles requests

const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products'); // takes to file !!!

// anything starting with /products in the url is forward to products.js
app.use('./products', productRoutes);

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
