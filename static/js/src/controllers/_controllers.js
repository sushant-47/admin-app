
var controllerApp = angular.module("customApp.controllers", []);

controllerApp
	.controller('appController', require("./app.controller.js"))
	.controller('loginController', require("./login.controller.js"))
	.controller('dashboardController', require("./dashboard.controller.js"));

module.exports = "customApp.controllers";
