
class LoggerService {
	private log_arr:string[] = [];
	constructor() {

	}

	get logs():string[] {
		return this.log_arr;
	}

	addLogs(msg:string) {
		this.log_arr.push(msg);
	}

	printLogs() {
		console.log(this.log_arr);
	}

	logMessage(msg:string) {
		console.log(msg);
	}
}

// general class based service cannot be used as an angular injected service

export var logger:LoggerService = new LoggerService();
