import { Component, OnInit } from '@angular/core';
import { SpeakerService } from 'src/app/shared/services/speaker.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConferenceService } from 'src/app/shared/services/conference.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-conference-curd',
	templateUrl: './conference-curd.component.html',
	styleUrls: [ './conference-curd.component.css' ]
})
export class ConferenceCurdComponent implements OnInit {
	displayedColumns: string[] = [ 'name', 'description', 'type', 'to', 'from', 'day', 'venue', 'edit' ];
	dataSource;
	type = [ 'Keynote Speaker', 'Fireside chat', 'Panel Discussion' ];
	venue = [ 'Main hall 1', 'Main hall 2', 'Main hall 3' ];
	day = [ '30/04/2019', '1/05/2019' ];
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
			type: [ '' ],
			venue: [ '' ]
		});
	}
	getConferenceById(id) {
		this.conService.getConferenceById(id).subscribe((val) => {
			this.conferenceForm.patchValue({
				name: val.name,
				description: val.description,
				to: val.to,
				from: val.from,
				day: val.actualDate,
				type: val.type,
				venue: val.venue
			});
			this.selectedType = val.type;
			if (this.selectedType === 'Keynote Speaker') {
				this.conferenceForm.patchValue({
					speaker: val.participant[0]
				});
			}
		}, (err) => console.log);
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
		console.log(item);
		this.selectedType = item.source.value;
		if (this.selectedType === 'Fireside chat' || this.selectedType === 'Keynote Speaker') {
			this.speaker.forEach((element) => {
				element.type = 'speaker';
			});
		}
	}
	selectDay(item) {
		this.selectedDay = item.source.value;
	}
	selectSpeaker(item) {
		this.selectedSpeaker = item.source.value;
		console.log(this.conferenceForm.get('speaker').value);
	}
	selectModerator(item) {
		this.selectedModerator = item.source.value;
		this.speaker.forEach((element) => {
			if (element.type === 'moderator') {
				element.type = 'speaker';
			}
		});
		this.speaker.forEach((element) => {
			if (item.value.id === element.id) {
				element.type = 'moderator';
			}
		});
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
			console.log(result);
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
			console.log(result);
			this.toastr.success('Participants have been saved, reselect to change your values.');
		});
	}

	ngOnInit() {
		this.speakerService.getSpeaker().subscribe(
			(val) => {
				val.forEach((element) => {
					const data = {
						name: element.name,
						id: element.id,
						type: 'speaker',
						imgUrl: element.image
					};
					this.speaker.push(data);
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
				actualDate: this.selectedDay,
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
				actualDate: this.selectedDay,
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
				participant: people,
				actualDate: this.selectedDay,
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
			(err) => {
				this.toastr.error('Error, check all entries and try again!');
				console.log(err);
			}
		);
	}
	updateConference() {}
	compareFn(o1, o2) {
		console.log(o1, o2);
		if (o1.id === o2.id) {
			return true;
		}
		return false;
	}
}
