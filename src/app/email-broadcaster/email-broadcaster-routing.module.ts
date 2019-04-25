import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BroadcasterComponent } from './broadcaster/broadcaster.component';

const routes: Routes = [ { path: '', component: BroadcasterComponent } ];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class EmailBroadcasterRoutingModule {}
