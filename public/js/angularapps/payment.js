var payment = angular.module('payment', [])
.directive('eatClick', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
})
.controller('PaymentForm',function($scope,$http){
	$scope.variables = {};
	$scope.validation = {};
	$scope.variables.currency = "USD";
	
	$scope.process = function(){
	
		var data = {
					
					'email': $scope.variables.email,
					'amount': $scope.variables.amount,
					'message': $scope.variables.message,
					'reason': $scope.variables.reason,
					'_csrf': $scope.csrf,
					'currency': $scope.variables.currency
					
		};
		
		if($scope.processValidation(data))
			$http.post('/payment',data);
	}
	
	$scope.setVariables = function(variables){
		
		angular.forEach(variables, function(value, key){
			$scope.variables[key] = value;
		});
		
		
	}
	
	$scope.processValidation = function(data)
	{
		console.log(data);
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