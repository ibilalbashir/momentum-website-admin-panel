import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface DialogData {
	speaker: string[];
}
@Component({
	selector: 'app-dialog-box',
	templateUrl: './dialog-box.component.html',
	styleUrls: [ './dialog-box.component.css' ]
})
export class DialogBoxComponent implements OnInit {
	participants: string[] = [];
	selectedParticipants = [];
	constructor(public dialogRef: MatDialogRef<DialogBoxComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
		this.participants = data as any;
	}
	onChange(item) {
		if (item.checked) {
			this.selectedParticipants.push(item.source.value);
		} else {
			this.selectedParticipants.splice(this.participants.indexOf(item.source.value), 1);
		}
	}
	closeDialog(): void {
		this.dialogRef.close(this.selectedParticipants);
	}

	ngOnInit() {}
}
