import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { DisplayTicketComponent } from './display-ticket/display-ticket.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
	declarations: [ DisplayTicketComponent ],
	imports: [
		CommonModule,
		TicketRoutingModule,
		MatTableModule,
		MatPaginatorModule,
		MatRadioModule,
		MatCheckboxModule,
		ToastrModule.forRoot()
	]
})
export class TicketModule {}
