var payment = angular.module('payment', [])
.directive('eatClick', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
})
.controller('PaymentForm',function($scope,$http){
	

	$scope.init = function(){
		$scope.amount = {};
		$scope.credit_card = {};
		$scope.credit_card.type = 'visa';
		$scope.credit_card.billing_address = {};
		$scope.pay = {};
		$scope.validation = {};
		$scope.amount.currency = "USD";
		$scope.description = '';
	}
	
	
	
	
	$scope.process = function(){
		$scope.pay.processing = 1;
		var data = {
			'_csrf': $scope.csrf,
			'intent': 'sale',
			'payer': {
				
				'payment_method':'credit_card',
				'funding_instruments':[]
				
			},
			transactions:[],
		};
		
		data.payer.funding_instruments.push({credit_card:$scope.credit_card});
		data.transactions.push({amount:$scope.amount,description:$scope.description});
		
		
		
		
			$http.post('/payment',data).success(function(response){
				
				$scope.pay.processing = 0;
				$scope.pay.success = 1;
				$scope.pay.data = response;
				
				//If Save CC was selected hit up the save card api
				if($scope.savecc)
				{
					var data = {
							'_csrf': $scope.csrf,
							'credit_card': $scope.credit_card,
					};
					
					$http.post('/payment/savecard',data).success(function(response){
						$scope.pay.savecc = response;
					});
					
				}
			
				
				
				
			}).error(function(response){
				
				$scope.validation = response;
				$scope.pay.processing = 0;
			});
		
		
		
	}
	
	$scope.setVariables = function(variables){
		
		angular.forEach(variables, function(value, key){
			$scope.variables[key] = value;
		});
		
		
	}
	
	$scope.processValidation = function(data)
	{
		if(!$scope.skipClientValidation)
		{
			$scope.validation = {};
			if(data.email == undefined)
				$scope.validation.email = true;
			if(data.amount == undefined || data.amount < 0)
				$scope.validation.amount = true;
			if(data.currency != 'USD' && data.currency != 'EUR' && data.currency != 'JPY')
				$scope.validation.currency = true;
			if(data.reason == undefined)
				$scope.validation.reason = true;
			
			angular.forEach($scope.validation, function(value, key){
				if(value)
					return false;
			});
		}
		
		return true;
	}
	
	$scope.populateForm = function(){
		$scope.credit_card.first_name = 'Fred';
		$scope.credit_card.last_name = 'Flintstone';
		$scope.credit_card.billing_address.line1 = '123 Bedrock Street';
		$scope.credit_card.billing_address.city = 'Bedrock';
		$scope.credit_card.billing_address.state = 'CA';
		$scope.credit_card.billing_address.postal_code = '90210';
		$scope.credit_card.billing_address.country_code = 'US';
		$scope.credit_card.number = '4532035029669178';
		$scope.credit_card.expire_month = '11';
		$scope.credit_card.expire_year = '2016';
		$scope.credit_card.cvv2 = '111';
		$scope.amount.total = '58.75';
		$scope.description = 'This is a test payment';
	
	}
	
	//PrePopulate Form
	//$scope.populateForm();
	
	$scope.init();
});