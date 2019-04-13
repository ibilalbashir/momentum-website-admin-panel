import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyCrudComponent } from './company-crud/company-crud.component';

const routes: Routes = [
	{
		path: '',
		children: [ { path: '', component: CompanyCrudComponent } ]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class CompanyRoutingModule {}
