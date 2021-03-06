'use strict';


var PaymentModel = require('../models/paymentModel');
var paypal = require('paypal-rest-sdk');
var http = require('http');

module.exports = function (app) {

    var model = new PaymentModel();


    app.get('/payment', function (req, res) {
        
        res.render('payment', model);
        
    });
    
    app.post('/payment/savecard', function (req, res) {
        var data = {
        	type: req.body.credit_card.type,
        	number: req.body.credit_card.number,
        	expire_month:req.body.credit_card.expire_month,
        	expire_year: req.body.credit_card.expire_year,
        	first_name: req.body.credit_card.first_name,
        	last_name:	req.body.credit_card.last_name
        		
        }
        
    	paypal.credit_card.create(data,{}, function (err, resp){
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
    
    app.get('/payment/getcard/:id', function (req, res) {
       
        
    	paypal.credit_card.get(req.params.id,{}, function (err, resp){
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
    
    app.get('/payment/stored/:id', function (req, res) {
    	
    	var data = {
    			intent: "sale",
    			payer:{
    				payment_method: "credit_card",
    				funding_instruments:[{
    				       credit_card_token:{
    				    	   credit_card_id: req.params.id
    				       }
    				}]
    			},
    			transactions:[{
    			     amount:{
    			    	 "total":"6.70",
    			    	 "currency":"USD"
    			     },
    			     description:"This is a payment on a stored card"
    			}]
    	}
    	
    	model.exchangeData(data);
  
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
