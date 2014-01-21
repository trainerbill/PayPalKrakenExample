'use strict';


var PaymentModel = require('../models/paymentModel');
var paypal = require('paypal-rest-sdk');

module.exports = function (app) {

    var model = new PaymentModel();


    app.get('/payment', function (req, res) {
        
        res.render('payment', model);
        
    });
    
    app.post('/payment', function (req, res) {
    	model.exchangeData(req.body);
    	
    	
    	
    	
    	
    	
    	//Execute the payment.
    	paypal.payment.create(JSON.stringify(model), {}, function (err, resp) {
            if (err) {
            	res.writeHead(500, { 'Content-Type': 'application/json' });
            	
                res.write(JSON.stringify(err));
                res.end();
            }

            if (resp) {
            	res.writeHead(200, { 'Content-Type': 'application/json' });
       
            	res.write(JSON.stringify(resp));
                res.end();
            }
        });
    });
    
    app.get('/payment/history/:limit/:start', function (req, res) {
        
    		var listPayment = {
        	    'count': req.params.limit,
        	    'start_index': req.params.start,
        	};

    		paypal.payment.list(listPayment, {}, function (err, resp) {
    			 if (err) {
    				 res.writeHead(500, { 'Content-Type': 'application/json' });
    	             res.write(JSON.stringify(err));
    	             res.end();
    	         }

    	         if (resp) {
    	        	 res.writeHead(200, { 'Content-Type': 'application/json' });
    	        	 res.write(JSON.stringify(resp));
    	             res.end();
    	         }
        	});
    });
    

};
