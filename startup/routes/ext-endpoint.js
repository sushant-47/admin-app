
const request = require('request-promise');
const log4js = require('log4js');
const logger = log4js.getLogger('localhost');

function checkLogin(data) {
	var options = {
		uri: "http://15.206.185.198:8080/agent-service/auth/v1.0.0/login",
		method: 'POST',
		headers: {
			"appVersion": 100,
			"Content-Type": "application/json"
		},
		body: data,
		json: true
	};
	logger.warn("sending login request");
	return request(options).then(function(response) {
		logger.warn("response from external login api : ", response);
		if (response.code == 200) {
			return Promise.resolve(response.data);
		} else {
			return Promise.reject();
		}
	}).catch(function(error) {
		logger.warn("error in getting api response ");
		logger.error(error.error);
		return Promise.reject();
	});
}

function getAgentDetails(agentCredentials) {
	var options = {
		uri: "http://15.206.185.198:8080/agent-service/v1.0.0/agentProfile",
		method: 'GET',
		headers: agentCredentials,
		json: true
	};
	logger.warn("request to fetch agent profile");
	return request(options).then(function(response) {
		logger.warn("fetch profile api response : ", response);
		if (response.code == 200) {
			return Promise.resolve(response.data);
		} else {
			return Promise.reject();
		}
	}).catch(function(error) {
		logger.warn("error in getting agent profile");
		logger.error(error.error);
		return Promise.reject();
	});
}

module.exports = {
	checkLogin: checkLogin,
	getAgentDetails: getAgentDetails
};
