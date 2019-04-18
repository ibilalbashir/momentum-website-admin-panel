import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopRoutingModule } from './workshop-routing.module';
import { WorkshopCrudComponent } from './workshop-crud/workshop-crud.component';
import {
	MatInputModule,
	MatSelectModule,
	MatButtonModule,
	MatExpansionModule,
	MatFormFieldModule,
	MatTableModule,
	MatCheckboxModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
	declarations: [ WorkshopCrudComponent ],
	imports: [
		CommonModule,
		WorkshopRoutingModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatExpansionModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatTableModule,
		MatCheckboxModule,
		ToastrModule.forRoot()
	]
})
export class WorkshopModule {}
