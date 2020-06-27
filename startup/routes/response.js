
function response() {
	var success_res_obj = {
		successful: true,
		message: 'Success',
		data: null
	};
	var unsuccess_res_obj = {
		successful: false,
		message: '',
		data: null
	};

	return {
		success_res_obj: success_res_obj,
		unsuccess_res_obj: unsuccess_res_obj
	}
}

module.exports = response;
