
var serviceApp = angular.module("customApp.services", []);

serviceApp
	.service("ApiService", require("./api.service.js"));

module.exports = "customApp.services";
