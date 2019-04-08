import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerCrudComponent } from './partner-crud/partner-crud.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: PartnerCrudComponent
			}
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class PartnerRoutingModule {}
