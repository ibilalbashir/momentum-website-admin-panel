import { Component, OnInit } from '@angular/core';
import { SpeakerService } from 'src/app/shared/services/speaker.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConferenceService } from 'src/app/shared/conference.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-conference-curd',
	templateUrl: './conference-curd.component.html',
	styleUrls: [ './conference-curd.component.css' ]
})
export class ConferenceCurdComponent implements OnInit {
	displayedColumns: string[] = [ 'name', 'description', 'type', 'to', 'from', 'day', 'venue' ];
	dataSource;
	type = [ 'Keynote Speaker', 'Fireside chat', 'Panel Discussion' ];
	venue = [ 'Main hall 1', 'Main hall 2', 'Main hall 3' ];
	day = [ '3/10/2020', '2/11/2020' ];
	speaker = [];
	selectedType;
	selectedParticipants = [];
	selectedDay;
	selectedModerator;
	selectedSpeaker;
	selectedVenue;
	selectedPanelParticipants = [];
	conferenceForm: FormGroup;
	constructor(
		private speakerService: SpeakerService,
		public dialog: MatDialog,
		private toastr: ToastrService,
		private fb: FormBuilder,
		private conService: ConferenceService
	) {
		this.conferenceForm = fb.group({
			name: [ '' ],
			description: [ '' ],
			to: [ '' ],
			from: [ '' ],
			day: [ '' ],
			moderator: [ '' ],
			speaker: [ '' ],
			type: [ '' ]
		});
	}
	fetchConference() {
		this.conService.getConference().subscribe(
			(val) => {
				this.dataSource = new MatTableDataSource<any>(val);
			},
			(err) => {
				return console.log(err);
			}
		);
	}
	selectType(item) {
		this.selectedType = item.source.value;
	}
	selectDay(item) {
		this.selectedDay = item.source.value;
	}
	selectSpeaker(item) {
		this.selectedSpeaker = item.source.value;
	}
	selectModerator(item) {
		this.selectedModerator = item.source.value;
	}
	selectVenue(item) {
		this.selectedVenue = item.source.value;
	}
	openDialog(): void {
		const dialogRef = this.dialog.open(DialogBoxComponent, {
			width: '500px',
			data: this.speaker
		});
		dialogRef.afterClosed().subscribe((result) => {
			this.selectedParticipants = result;
			this.toastr.success('Participants have been saved, reselect to change your values.');
		});
	}
	openPanelDialog(): void {
		const dialogRef = this.dialog.open(DialogBoxComponent, {
			width: '500px',
			data: this.speaker
		});
		dialogRef.afterClosed().subscribe((result) => {
			this.selectedPanelParticipants = result;
			this.toastr.success('Participants have been saved, reselect to change your values.');
		});
	}

	ngOnInit() {
		this.speakerService.getSpeaker().subscribe(
			(val) => {
				console.log(val);
				val.forEach((element) => {
					this.speaker.push(element.name);
				});
			},
			(err) => console.log(err)
		);
		this.fetchConference();
	}
	onSubmit() {
		let people = [];
		let data;
		if (this.selectedType === 'Keynote Speaker') {
			people.push(this.selectedSpeaker);
			data = {
				name: this.conferenceForm.get('name').value,
				description: this.conferenceForm.get('description').value,
				to: this.conferenceForm.get('to').value,
				from: this.conferenceForm.get('from').value,
				type: this.selectedType,
				participant: people,
				venue: this.selectedVenue,
				ActualDate: this.selectedDay,
				tags: 'not yet defined'
			};
		} else if (this.selectedType === 'Fireside chat') {
			people = this.selectedParticipants;
			data = {
				name: this.conferenceForm.get('name').value,
				description: this.conferenceForm.get('description').value,
				to: this.conferenceForm.get('to').value,
				from: this.conferenceForm.get('from').value,
				type: this.selectedType,
				participant: people,
				venue: this.selectedVenue,
				ActualDate: this.selectedDay,
				tags: 'not yet defined'
			};
		} else if (this.selectedType === 'Panel Discussion') {
			people = this.selectedPanelParticipants;
			data = {
				name: this.conferenceForm.get('name').value,
				description: this.conferenceForm.get('description').value,
				to: this.conferenceForm.get('to').value,
				from: this.conferenceForm.get('from').value,
				type: this.selectedType,
				moderator: this.selectedModerator,
				participant: people,
				ActualDate: this.selectedDay,
				venue: this.selectedVenue,
				tags: 'not yet defined'
			};
		}
		this.conService.postConference(data).subscribe(
			(val) => {
				console.log(val);
				this.conferenceForm.reset();
				this.toastr.success('Conference Saved.');
				this.fetchConference();
			},
			(err) => this.toastr.error('Error, check all entries and try again!')
		);
	}
}
