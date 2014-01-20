'use strict';


var PaymentModel = require('../models/payment');


module.exports = function (app) {

    var model = new PaymentModel();


    app.get('/payment', function (req, res) {
        
        res.render('payment', model);
        
    });

};
