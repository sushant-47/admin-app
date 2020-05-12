import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { App2Component } from './app2.component';

@NgModule({
	declarations: [
		App2Component
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [App2Component]
})

export class AppModule { }
