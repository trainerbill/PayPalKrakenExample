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
	
	$scope.process = function(){
	
		var data = {
					
					'email': $scope.variables.email,
					'amount': $scope.variables.amount,
					'message': $scope.variables.message,
					'reason': $scope.variables.reason,
					'_csrf': $scope.variables.csrf
					
			};
		console.log(data);
		$http.post('/payment',data);
	}
	
	
	
});