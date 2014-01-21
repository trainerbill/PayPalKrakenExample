'use strict';

module.exports = function (app) {

    app.get('/paymenthistory', function (req, res) {
        
        res.render('paymenthistory');
        
    });

};
