
ApiService.$inject = ['$http', '$q'];
function ApiService($http, $q) {

	var self = this;
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
				return $q.resolve(response.data.data);
			} else {
				return $q.reject(response.data.message);
			}
		}, function(error) {
			console.log('error in getting data ; ', error);
			return $q.reject("Something went wrong. Try again later.");
		});
	};
}

module.exports = ApiService;
