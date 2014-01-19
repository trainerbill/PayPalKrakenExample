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
    		/*
    		//Do the Paypal payment
    		var payment = {
				"intent": "sale",
				"payer": {
				    "payment_method": "paypal"
				},
				"redirect_urls":{
				    "return_url":"//"+req.headers.host + "/success",
				    "cancel_url":"//"+req.headers.host + "/cancel"
				  },
				'transactions': []
            };
    		
    		
    		
    		//Set the total to charge the customer
            payment.transactions[0] = {
                amount: {
                    total: model.amount,
                    currency: model.currency
                },
                description: model.reason
            };
            
          //Execute the payment.
            paypal.payment.create(payment, {}, function (err, resp) {
                if (err) {
                    console.log(err);
                    res.render('result',{result:'Error :('});
                    return;
                }

                if (resp) {
                    delete req.session.cart;
                    delete req.session.displayCart;
                    res.render('result',{result:'Success :)'});
                }
            });
    		
            //console.log(req);
    		*/
    		
    		//Give it time to display the loading
    		setTimeout(function() {
    			res.writeHead(200, { 'Content-Type': 'application/json' });
    			res.write(JSON.stringify({amount:model.amount,currency:model.currency,reason:model.reason,email:model.email}));
                res.end();
    		}, 3000);	
    	
            
    	}
    	
    	
        
        
    });
};
