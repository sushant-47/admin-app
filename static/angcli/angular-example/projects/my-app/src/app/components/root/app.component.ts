import { Component, OnInit } from '@angular/core';
// import { logger as LoggerService } from '../logger.service';
import { LoggerService } from "../../services/logger.service";
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [LoggerService]
})

export class AppComponent implements OnInit {
	#title:string = 'my-app';

	// private loggerService:(typeof LoggerService) = LoggerService;

	constructor(private loggerService: LoggerService) {}
	public get title():string {
		return this.#title;
	}

	ngOnInit(): void {
		let ctrl = this;
		ctrl.loggerService.addToLogs("app component initiated");
		ctrl.loggerService.printLogs();
	}
}
