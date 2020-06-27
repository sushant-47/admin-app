import { Injectable } from '@angular/core';
import { ServiceModule } from './service.module';

var id = 1;
@Injectable()
export class LoggerService {
	check_id = id++;
	private log_arr:string[] = [];
	constructor() {
		console.log("constructor called");
	}

	addToLogs(msg:string):void {
		this.log_arr.push(msg);
		console.log("id : ", this.check_id);
	}

	printLogs():void {
		console.log(this.log_arr);
	}
}
