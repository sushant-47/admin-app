/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(8);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


var app = angular.module("customApp", [
	"ngRoute",
	__webpack_require__(2),
	__webpack_require__(6)
]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: true
	});

	$routeProvider
		.when('/', {
			templateUrl: '/templates/login.tmpl.html',
			controller: 'loginController',
			controllerAs: 'lctr'
		})
		.when('/dashboard', {
			templateUrl: '/templates/dashboard.tmpl.html',
			controller: 'dashboardController',
			controllerAs: 'dctr'
		});
}]);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


var controllerApp = angular.module("customApp.controllers", []);

controllerApp
	.controller('appController', __webpack_require__(3))
	.controller('loginController', __webpack_require__(4))
	.controller('dashboardController', __webpack_require__(5));

module.exports = "customApp.controllers";


/***/ }),
/* 3 */
/***/ (function(module, exports) {


appController.$inject = ['$rootScope', 'ApiService'];
function appController($rootScope, ApiService) {

	$rootScope.loggedInAgent = false;
	if (document.getElementById("loggedInAgent")) {
		var agentNode = document.getElementById("loggedInAgent").querySelector(".agent-details");
		$rootScope.loggedInAgent = true;
		$rootScope.agentDetails = {
			name: agentNode.getAttribute("data-name"),
			lang: agentNode.getAttribute("data-lang"),
			mobile: agentNode.getAttribute("data-mobile"),
			countryCode: agentNode.getAttribute("data-cc"),
			nameInitials: ""
		};
		if ($rootScope.agentDetails.name.length > 0) {
			$rootScope.agentDetails.nameInitials = $rootScope.agentDetails.name.split(" ").map(function(word) {
				return word[0];
			}).join("");
		}
		delete agentNode;
	}
}

module.exports = appController;


/***/ }),
/* 4 */
/***/ (function(module, exports) {


loginController.$inject = ['$rootScope'];
function loginController($rootScope) {

}

module.exports = loginController;


/***/ }),
/* 5 */
/***/ (function(module, exports) {


dashboardController.$inject = ['$rootScope', 'ApiService'];
function dashboardController($rootScope, ApiService) {

	var ctrl = this;

	angular.extend(ctrl, {
		itemSelected: true,
		blockCount: 0,
		pageSize: 10,
		selectedPage: 0,
		pagesInBlock: 5,
		customers: {},
		pageCustomers: [],
		getPageArray: function() {
			var pageStart = ctrl.blockCount * ctrl.pagesInBlock + 1;
			var pageEnd = pageStart + ctrl.currentPagesInBlock - 1;
			var str = '';
			for (var i=pageStart; i <= pageEnd; i++) {
				str += i;
			}
			return str;
		},
		getCustomersByBlock: getCustomersByBlock,
		getCustomersByPage: getCustomersByPage
	});

	init();
	function init() {
		getCustomersByBlock(ctrl.blockCount);
	}

	function getCustomersByBlock(blockCount) {
		var params = {
			name: "",
			pageNum: blockCount + 1,
			pageCount: 50	// max number for fetching as much as possible customers at once
		};
		ApiService.getCustomers(params).then(function(data) {
			ctrl.customers[blockCount] = data.users;
			ctrl.pageCustomers = data.users.slice(ctrl.selectedPage, ctrl.pageSize);
			ctrl.blockLoaded = true;
			if (data.users.length < 50) {
				if (data.users.length % 10 != 0) {
					ctrl.currentPagesInBlock = parseInt(data.users.length / ctrl.pageSize) + 1;
				} else {
					ctrl.currentPagesInBlock = parseInt(data.users.length / ctrl.pageSize);
				}
				ctrl.moreBlocks = false;
			} else {
				ctrl.currentPagesInBlock = parseInt(data.users.length / ctrl.pageSize);
				ctrl.moreBlocks = true;
			}
		}, function(error) {
			ctrl.blockLoaded = false;
		});
	}

	function getCustomersByPage(blockCount, pageCount) {
		var startIndex = pageCount * ctrl.pageSize;
		var endIndex = startIndex + ctrl.pageSize;
		ctrl.pageCustomers = ctrl.customers[blockCount].slice(startIndex, endIndex);
	}
}

module.exports = dashboardController;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


var serviceApp = angular.module("customApp.services", []);

serviceApp
	.service("ApiService", __webpack_require__(7));

module.exports = "customApp.services";


/***/ }),
/* 7 */
/***/ (function(module, exports) {


ApiService.$inject = ['$http'];
function ApiService($http) {

	var self = this;
	var SERVER_ERROR = "Something went wrong. Try again later.";

	self.login = function(data) {
		return $http({
			url: 'http://15.206.185.198:8080/agent-service/auth/v1.0.0/login',
			method: "POST",
			headers: {
				"appVersion": 100,
				"Content-Type": 'application/json'
			},
			data: data,
		}).then(function(response) {
			console.log('response : ', response);
			if (response.data.code == 200) {
				return Promise.resolve(response.data.data);
			} else {
				return Promise.reject(response.data.message);
			}
		}, function(error) {
			console.log('error in getting data ; ', error);
			return Promise.reject(SERVER_ERROR);
		});
	};

	self.getCustomers = function(params) {
		return $http({
			url: '/get/customers',
			method: 'GET',
			params: params,
			cache: true
		}).then(function(response) {
			if (response.data.successful) {
				return Promise.resolve(response.data.data);
			} else {
				return Promise.reject(response.data.message);
			}
		}, function(error) {
			console.log("error in getting customers : ", error);
			return Promise.reject(error);
		});
	};
}

module.exports = ApiService;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);