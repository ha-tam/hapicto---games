var app = angular.module('app', ['ngAnimate', 'ngRoute', 'ngTouch']);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/clickTheDot', {
				templateUrl: 'clickTheDot/index.html',
				controller: 'clickTheDotControler'
			}).
			when('/clickTheDot/:speed', {
				templateUrl: 'clickTheDot/index.html',
				controller: 'clickTheDotControler'
			}).
			otherwise({
				templateUrl: 'clickTheDot/index.html',
				controller: 'clickTheDotControler'
			});
}]);
