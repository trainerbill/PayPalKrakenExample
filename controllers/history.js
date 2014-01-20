'use strict';


//var HistoryModel = require('../models/historyModel');
var PaymentModel = require('../models/paymentModel');

module.exports = function (app) {

    //var model = new HistoryModel();
	
	//Setup Payments.  Normally out of a DB
	var payments = [];
	//Create Model
	var payment = new PaymentModel();
	payment.exchangeData({
		id: "PAY-17S8410768582940NKEE66EQ",
		date:'1/1/2014',
		email:'betty.rubble@gmail.com',
		amount:3.52,
		currency: 'USD',
		message: 'This is a payment to Wilma for some food.',
		reason:'I am paying for goods or services'
		
	});
	payments.push(payment);
	
	//Create Model
	var payment = new PaymentModel();
	payment.exchangeData({
		id: "PAY-17S8410768582940NKEE66ER",
		date:'1/3/2014',
		email:'barney.rubble@gmail.com',
		amount: 53.50,
		currency: 'EUR',
		message: 'This is a payment to Fred.  I owe him some money.',
		reason:'I am sending money to family or friends'
		
	});
	payments.push(payment);
	
	//Create Model
	var payment = new PaymentModel();
	payment.exchangeData({
		id: "PAY-17S8410768582940NKEE66ES",
		date:'1/4/2014',
		email:'fred.flintstone@gmail.com',
		amount:13.68,
		currency: 'JPY',
		message: 'This is a payment to Fred for some cool stuff',
		reason:'I am paying for goods or services'
		
	});
	payments.push(payment);
	
	//Create Model
	var payment = new PaymentModel();
	payment.exchangeData({
		id: "PAY-17S8410768582940NKEE66ET",
		date:'1/7/2014',
		email:'wilma.flintstone@gmail.com',
		amount:99.90,
		currency: 'USD',
		message: 'This is a payment to Fred.  He is trapped and needs  money.',
		reason:'I am sending money to family or friends'
		
	});
	payments.push(payment);
	

    app.get('/history', function (req, res) {
        
        res.render('history');
        
    });

    app.get('/history/send', function (req, res) {
        
    	var history = {
    			
    			account: "Andrew Throener",
    			payments: payments
    			
    	};
    	
    	
    	
    	res.writeHead(200, { 'Content-Type': 'application/json' });
		res.write(JSON.stringify(history));
        res.end();
        
    });
    
    app.get('/history/send/:id', function (req, res) {
        
    	var payment;
    	payments.forEach(function(value){
    		if(value.id == req.params.id)
    		{
    			payment = value;
    		}
    	});
    	
    	
    	
    	res.writeHead(200, { 'Content-Type': 'application/json' });
		res.write(JSON.stringify(payment));
        res.end();
        
    });

};
