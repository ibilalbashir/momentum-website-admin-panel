import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeakerRoutingModule } from './speaker-routing.module';
import { SpeakerCrudComponent } from './speaker-crud/speaker-crud.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { ToastrModule } from 'ngx-toastr';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
	declarations: [ SpeakerCrudComponent ],
	imports: [
		CommonModule,
		SpeakerRoutingModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatExpansionModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatTableModule,
		ToastrModule.forRoot()
	]
})
export class SpeakerModule {}
