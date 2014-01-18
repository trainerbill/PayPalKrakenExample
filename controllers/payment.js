'use strict';


var PaymentModel = require('../models/paymentModel');
var paypal = require('paypal-rest-sdk');

module.exports = function (app) {

    var model = new PaymentModel();


    app.get('/payment', function (req, res) {
        
        res.render('payment', model);
        
    });
    
    app.post('/payment', function (req, res) {
        
    	//Exchange data with the model
    	model.exchangeData(req.body);
    	
    	//Perform Model validation
    	model.modelValidation();
    	
    	//Check Validation
    	if(Object.keys(model.validation).length > 0)
    	{
    		//Validation Errors
    		res.writeHead(500, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(model.validation));
            res.end();
    	}
    	else
    	{
    		//Do the Paypal payment
    		res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(model.validation));
            res.end();
    	}
    	
    	
        
        
    });
};
