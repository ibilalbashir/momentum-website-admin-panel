import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanySerRoutingModule } from './company-ser-routing.module';
import { CompanySerCrudComponent } from './company-ser-crud/company-ser-crud.component';
import { MatTableModule } from '@angular/material/table';
import {
	MatInputModule,
	MatExpansionModule,
	MatSelectModule,
	MatFormFieldModule,
	MatButtonModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
	declarations: [ CompanySerCrudComponent ],
	imports: [
		CommonModule,
		CompanySerRoutingModule,
		MatInputModule,
		MatExpansionModule,
		MatSelectModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatButtonModule,
		MatTableModule,
		ToastrModule.forRoot()
	]
})
export class CompanySerModule {}
