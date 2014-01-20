'use strict';

module.exports = function sendMoneyModel() {
	
	return {
			
			id: '',
			email: '',
			date:'',
			amount: '',
			message:'',
			reason:'',
			currency:'',
			currencycode:'',
			validation:{},
			
			exchangeData: function(data){
				this.id = data.id;
				this.email = data.email;
				this.date = data.date;
				this.amount = data.amount.toFixed(2);
				this.message = data.message;
				this.reason = data.reason;
				this.currency = data.currency;
				this.currencycode = this.getCurrencyHtml(data.currency);
				
			},
			
			modelValidation: function(){
				this.validation = {};
				if( !/(.+)@(.+){2,}\.(.+){2,}/.test(this.email) ){
					this.validation.email = "Not a valid email address";
				}
				
				if(!this.amount || this.amount < 1)
					this.validation.amount = "Amount must be greater than 0";
				
				if(!this.reason)
					this.validation.reason = 'You must set a reason';
				if(!this.currency || (this.currency != 'USD' && this.currency != 'EUR' && this.currency != 'JPY'))
					this.validation.currency = 'Currency is not valid';
			},
			
			getCurrencyHtml: function(code){
				
				if(code == 'USD')
					return '$';
				else if(code=='EUR')
					return '&euro;';
				else if(code=='JPY')
					return '&yen;';
				else
					return 'Currency Not Found';
			}
			
			


	};
	
};
