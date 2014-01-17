'use strict';


var PaymentModel = require('../models/paymentModel');
var paypal = require('paypal-rest-sdk');

module.exports = function (app) {

    var model = new PaymentModel();


    app.get('/payment', function (req, res) {
        
        res.render('payment', model);
        
    });
    
    app.post('/payment', function (req, res) {
        
        console.log(req.body);
        
    });
};
