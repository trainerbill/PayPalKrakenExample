var history = angular.module('history', ['ngSanitize'])
.directive('eatClick', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
})
.controller('HistoryView',function($scope,$http){
	$scope.history = {};
	
	
	$http.get('/history/send').success(function(response){
		
		$scope.history = response;
		
		
	}).error(function(response){
		
	});
	
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
	
});