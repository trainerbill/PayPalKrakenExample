'use strict';

var SendMoneyModel = require('../models/sendMoneyModel');

module.exports = function (app) {

    var model = new SendMoneyModel();


    app.get('/sendmoney', function (req, res) {
        
        res.render('sendmoney', model);
        
    });
    
    app.post('/sendmoney', function (req, res) {
        
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
    		//Give it time to display the loading
    		setTimeout(function() {
    			res.writeHead(200, { 'Content-Type': 'application/json' });
    			res.write(JSON.stringify(model));
                res.end();
    		}, 3000);	
    	}
    });
};
