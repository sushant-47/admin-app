
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
