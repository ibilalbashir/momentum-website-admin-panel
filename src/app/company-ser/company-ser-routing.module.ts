import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanySerCrudComponent } from './company-ser-crud/company-ser-crud.component';

const routes: Routes = [
	{
		path: '',
		children: [ { path: '', component: CompanySerCrudComponent } ]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class CompanySerRoutingModule {}
