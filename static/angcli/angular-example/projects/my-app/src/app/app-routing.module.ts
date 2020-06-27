import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/_component.module';

const routes: Routes = [
	{ path: 'dashboard', component: DashboardComponent},
	{ path: '', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }
