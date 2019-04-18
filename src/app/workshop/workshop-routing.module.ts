import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkshopCrudComponent } from './workshop-crud/workshop-crud.component';

const routes: Routes = [
	{
		path: '',
		component: WorkshopCrudComponent
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class WorkshopRoutingModule {}
