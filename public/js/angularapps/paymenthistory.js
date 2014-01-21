var paymenthistory = angular.module('paymenthistory', ['ngSanitize'])
.directive('eatClick', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
})
.controller('PaymentHistoryView',function($scope,$http){
	$scope.history = {};
	$scope.limit = 10;
	$scope.start = 1;
	
	
	$scope.getTransactions = function(decrease)
	{
		$scope.processing = 1;
		
		if($scope.start < 1)
			$scope.start = 1;
		
		if(decrease)
			$scope.start -= 20;
		$http.get('/payment/history/'+$scope.limit+'/'+$scope.start).success(function(response){
			
			
			$scope.history = response;
			$scope.processing = 0;
			
			$scope.start += 10;
			
			if(response.payments.length < 10)
				$scope.nomore = 1;
			
		}).error(function(response){
			
		});
	}
	
	$scope.getCurrencyHtml = function(code){
		
		if(code == 'USD')
			return '$';
		else if(code=='EUR')
			return '&euro;';
		else if(code=='JPY')
			return '&yen;';
		else
			return 'Currency Not Found';
	}
	
	$scope.setTransaction = function(trx){
		$scope.transaction = trx;
	}
	
	$scope.clearTransaction=function(){
		delete $scope.transaction;
	}
	
	$scope.getTransactions();
	
});