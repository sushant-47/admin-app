import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {
	#title:string = 'my-app';

	public get title():string {
		return this.#title;
	}
}
