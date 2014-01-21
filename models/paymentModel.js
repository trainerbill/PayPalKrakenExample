'use strict';

module.exports = function paymentModel() {
	
	return {
			
			id: '',
			create_time: '',
			update_time:'',
			state: '',
			intent:'',
			payer:{
				
				payment_method:'',
				funding_instruments:[]
				
			},
			transactions:[],
			links:[],
			
			exchangeData:function (data){
				//console.log(data);
				this.id = data.id;
				this.create_time = data.create_time;
				this.update_time = data.update_time;
				this.state = data.state;
				this.intent = data.intent;
				this.payer = data.payer;
				this.transactions = data.transactions;
				this.links = data.links;
				
			}
	};
	
	
	
};
