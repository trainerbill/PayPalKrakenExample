'use strict';

module.exports = function paymentModel() {
	
	return {
			
			email: '',
			amount: '',
			message:'',
			reason:'',
			currency:'',
			validation:{},
			
			exchangeData: function(data){
				
				this.email = data.email;
				this.amount = data.amount;
				this.message = data.message;
				this.reason = data.reason;
				this.currency = data.currency;
				
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
			}


	};
	
};
