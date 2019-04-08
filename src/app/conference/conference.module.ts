import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConferenceRoutingModule } from './conference-routing.module';
import { ConferenceCurdComponent } from './conference-curd/conference-curd.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { ToastrModule } from 'ngx-toastr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

@NgModule({
	declarations: [ ConferenceCurdComponent, DialogBoxComponent ],
	imports: [
		CommonModule,
		ConferenceRoutingModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatExpansionModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatTableModule,
		MatDatepickerModule,
		MatNativeDateModule,
		ToastrModule.forRoot(),
		MatCheckboxModule,
		MatDialogModule
	],
	entryComponents: [ DialogBoxComponent ]
})
export class ConferenceModule {}
