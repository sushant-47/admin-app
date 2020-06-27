
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './root/app.component';
import { ServiceModule } from '../services/service.module';

// if a component has been declared but not exported the NgModule makes it a private component of this module i.e. only other declared components in this module can use that component/pipe/etc in their templates
@NgModule({
	declarations: [
		DashboardComponent,
		AppComponent
	],
	imports: [
		RouterModule,
		ServiceModule
	],
	exports: [
		DashboardComponent,
		AppComponent
	]
})

export class ComponentModule {}
export { DashboardComponent } from './dashboard/dashboard.component';
export { AppComponent } from './root/app.component';

