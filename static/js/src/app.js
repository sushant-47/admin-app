
var app = angular.module("customApp", [
	"ngRoute",
	require("./controllers/_controllers.js"),
	require("./services/_services.js")
]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: true
	});

	$routeProvider
		.when('/', {
			templateUrl: 'resource/templates/login.tmpl.html',
			controller: 'loginController',
			controllerAs: 'lctr'
		})
		.when('/dashboard', {
			templateUrl: 'resource/templates/dashboard.tmpl.html',
			controller: 'dashboardController',
			controllerAs: 'dctr'
		});
}]);
