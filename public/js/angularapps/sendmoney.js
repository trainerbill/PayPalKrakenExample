var sendmoney = angular.module('sendmoney', [])
.directive('eatClick', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
})
.controller('SendMoneyForm',function($scope,$http){
	$scope.variables = {};
	$scope.pay = {};
	$scope.validation = {};
	$scope.variables.currency = "USD";
	$scope.skipClientValidation = 0;
	$scope.pay.good = 0;
	
	
	
	$scope.process = function(){
		$scope.pay.processing = 1;
		var data = {
					
					'email': $scope.variables.email,
					'amount': $scope.variables.amount,
					'message': $scope.variables.message,
					'reason': $scope.variables.reason,
					'_csrf': $scope.csrf,
					'currency': $scope.variables.currency
					
		};
		
		if($scope.processValidation(data))
		{
			$http.post('/sendmoney',data).success(function(response){
				$scope.validation = {};
				$scope.pay.processing = 0;
				$scope.pay.good = 1;
				$scope.pay.data = response;
				
				
			}).error(function(response){
				
				$scope.validation = response;
				$scope.pay.processing = 0;
			});
		}
		else
			$scope.pay.processing = 0;
		
		
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
	
	$scope.clearForm = function(){
		$scope.variables.email = '';
		$scope.variables.amount = undefined;
		$scope.variables.message = undefined;
		$scope.variables.reason = undefined;
		$scope.variables.currency = 'USD';
		//$scope.variables.email = undefined;		//There must be a bug in angular that is not allowing me to set an input of type email to undefined.  serverside validation will take care of this.
	}
	
	
	
	
});