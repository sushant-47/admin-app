
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
