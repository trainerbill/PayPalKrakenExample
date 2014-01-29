Andrews Kraken/NodeJS Example
==========================

This is an example application built using PayPal Kraken and Node JS.  The application should be responsive with Bootstrap 3.0.

Releases
==========================
v1.x - Version 1 is the requirements based on the documentation provided<br/>
v2.x - Attempt to use PayPal Rest SDK to pull in real transactions
v3.x - Implemented stored credit card.  Store,get,use.


Setup
==========================
1.  git clone https://github.com/trainerbill/PayPalKrakenExample.git
2.  cd PayPalKrakenExample
3.	git checkout thetagofthereleaseyouwant
4.  npm install
5.  npm start
6.   Go to http://localhost:8000 in your browser.



Functionality
==========================
1.  Mock make Payments to a user.  Does not actually execute a PayPal API call
2.  Mock view transaction history.  Does not actually execute a PayPal API call
3.  Version 2.x only.  Credit card payment via paypal rest api sdk
3.  Version 2.x only.  View payments via PP rest api sdk


Technologies Used
==========================
1.	Kraken Generator
2.	NodeJS
3.	AngularJS
4.	Bootstrap 3.0