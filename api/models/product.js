const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // serial id string (for mongoose)
    name: { type: String, required: true },
    price: { type: Number, required: true }
}); // layout of object

// model is the object itself (constructor)

module.exports = mongoose.model('Product', productSchema);