import { BrowserModule } from '@angular/platform-browser';	// also inherently re-exports CommonModule ; required for structured directives
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ComponentModule, AppComponent } from './components/_component.module';
import { ServiceModule } from './services/service.module';

@NgModule({
	declarations: [],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ComponentModule,
		ServiceModule
	],
	providers: [],
	bootstrap: [AppComponent]
})

export class AppModule { }
