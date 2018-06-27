const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId, // serial id string (for mongoose)
    name: String,
    price: Number
}) // layout of object

// model is the object itself (constructor)

module.exports = mongoose.model('Product', productSchema);