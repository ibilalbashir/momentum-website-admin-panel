import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayTicketComponent } from './display-ticket/display-ticket.component';

const routes: Routes = [
	{
		path: '',
		children: [ { path: '', component: DisplayTicketComponent } ]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class TicketRoutingModule {}
