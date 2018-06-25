// handles product related routes 

const express = require('express');
const router = express.Router();

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
    res.status(201).json({
        message: 'Handling POST requests to /products'
    });
});

// : is a var
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