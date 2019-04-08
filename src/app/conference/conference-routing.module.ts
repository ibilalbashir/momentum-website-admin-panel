import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConferenceCurdComponent } from './conference-curd/conference-curd.component';

const routes: Routes = [
	{
		path: '',
		children: [ { path: '', component: ConferenceCurdComponent } ]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class ConferenceRoutingModule {}
