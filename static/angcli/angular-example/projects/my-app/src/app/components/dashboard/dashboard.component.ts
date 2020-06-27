import { Component, OnInit } from '@angular/core';
import { logger as logger } from '../logger.service';
import { LoggerService } from '../../services/logger.service';

// component with its own injector
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
	// providers: [LoggerService]
})

export class DashboardComponent implements OnInit {

	private logger:(typeof logger) = logger;
	constructor(private loggerService: LoggerService) { }

	ngOnInit(): void {
		let ctrl = this;
		// ctrl.logger.addLogs("dashboard component initiated");
		// ctrl.logger.printLogs();
		ctrl.loggerService.addToLogs("dashboard component initiated");
		ctrl.loggerService.printLogs();
	}

}
