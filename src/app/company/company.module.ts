import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyCrudComponent } from './company-crud/company-crud.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [ CompanyCrudComponent ],
	imports: [
		CommonModule,
		CompanyRoutingModule,
		MatInputModule,
		MatExpansionModule,
		MatSelectModule,
		MatButtonModule
	]
})
export class CompanyModule {}
