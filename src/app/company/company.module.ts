import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyCrudComponent } from './company-crud/company-crud.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
	declarations: [ CompanyCrudComponent ],
	imports: [
		CommonModule,
		CompanyRoutingModule,
		MatInputModule,
		MatExpansionModule,
		MatSelectModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatButtonModule,
		MatTableModule,
		MatCheckboxModule,
		ToastrModule.forRoot()
	]
})
export class CompanyModule {}
