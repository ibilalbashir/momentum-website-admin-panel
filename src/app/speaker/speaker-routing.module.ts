import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpeakerCrudComponent } from './speaker-crud/speaker-crud.component';

const routes: Routes = [
	{
		path: '',
		children: [ { path: '', component: SpeakerCrudComponent } ]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class SpeakerRoutingModule {}
