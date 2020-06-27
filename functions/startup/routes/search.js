
const clone = require("rfdc")(); // fast deep cloning of large object
const express = require("express");
const router = express.Router();
const RemoteEndpoint = require("./ext-endpoint.js");
const log4js = require('log4js');
const logger = log4js.getLogger('localhost');
var response_obj = require("./response.js");

router.get("/customers", function(req, res, next) {
	logger.warn("request to fetch customers : ", req.query);
	var request = {
		headers: req.app.get("agentAccessDetails"),
		req_body: {
			name: req.query.name || "",
			pageNo: parseInt(req.query.pageNum) || 1,
			pageCount: parseInt(req.query.pageCount) || 50
		}
	};
	RemoteEndpoint.getCustomers(request).then(function(response) {
		var send_res_obj = clone(response_obj().success_res_obj);
		send_res_obj.data = response;
		logger.warn("object to send : ", send_res_obj);
		res.json(send_res_obj);
	}, function(error) {
		var send_res_obj = clone(response_obj().unsuccess_res_obj);
		send_res_obj.message = error;
		res.json(send_res_obj);
	});
});

router.get("/enrollments", function(req, res, next) {
	
});

module.exports = router;
