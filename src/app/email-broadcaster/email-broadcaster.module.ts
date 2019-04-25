import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailBroadcasterRoutingModule } from './email-broadcaster-routing.module';
import { BroadcasterComponent } from './broadcaster/broadcaster.component';
import { QuillModule } from 'ngx-quill';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material';
@NgModule({
	declarations: [ BroadcasterComponent ],
	imports: [
		CommonModule,
		EmailBroadcasterRoutingModule,
		QuillModule,
		MatInputModule,
		MatIconModule,
		MatCheckboxModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatChipsModule,
		MatAutocompleteModule
	]
})
export class EmailBroadcasterModule {}
