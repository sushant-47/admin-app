
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
