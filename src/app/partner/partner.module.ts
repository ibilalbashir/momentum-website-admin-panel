import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerCrudComponent } from './partner-crud/partner-crud.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
	declarations: [ PartnerCrudComponent ],
	imports: [
		CommonModule,
		PartnerRoutingModule,
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
export class PartnerModule {}
