'use strict';


//var HistoryModel = require('../models/historyModel');
var sendMoneyModel = require('../models/sendMoneyModel');

module.exports = function (app) {

    //var model = new HistoryModel();
	var payments = [];
	var emails = ['betty.rubble@gmail.com','barney.rubble@gmail.com','fred.flintstone@gmail.com','wilma.flintstone@gmail.com'];
	var currencys = ['USD','EUR','JPY'];
	var reasons = ['I am paying for goods or services','I am sending money to family or friends'];
	

	//Setup Payments.  Normally out of a DB.  Would rather use randoms but requirements say the output needs to be the same each run.
	for(var i = 4; i < 254;i++){
		//Create Model
		var payment = new sendMoneyModel();
		var emailmodulus = i % 4;
		var currencymodulus = i % 3;
		var amount = (i + 52.67) / 1.46;
		var datemodulus = i % 19;
		var date = 20 - datemodulus;
		if(date < 10)
			date = '0' + date;
		var reasonmodulus = i % 2;
		
		payment.exchangeData({
			id: i,
			date:'1/'+date+'/2014',
			email: emails[emailmodulus],
			amount:amount,
			currency: currencys[currencymodulus],
			message: 'This is a payment to '+emails[emailmodulus],
			reason: reasons[reasonmodulus]
			
		});
		payments.push(payment);
	}
	
	
	
	
	

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
