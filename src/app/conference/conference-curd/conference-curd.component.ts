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
	ifUpdate = false;
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
			venue: [ '' ],
			firesideChat: [ '' ],
			panel: []
		});
	}

	getConferenceById(id) {
		this.ifUpdate = true;
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
				console.log('hello from speaker');
				this.conferenceForm.patchValue({
					speaker: val.participant[0]
				});
			} else if (this.selectedType === 'Fireside chat') {
				console.log('hello from fireside');
				console.log(val.participant);
				this.conferenceForm.patchValue({
					firesideChat: val.participant
				});
			} else if (this.selectedType === 'Panel Discussion') {
				const panelPeople = [];
				let panelMod;
				val.participant.forEach((element) => {
					if (element.type === 'moderator') {
						panelMod = element;
					} else {
						panelPeople.push(element);
					}
				});
				this.conferenceForm.patchValue({
					panel: panelPeople,
					moderator: panelMod
				});
			}
		}, (err) => console.log);
	}
	cancelUpdate() {
		this.ifUpdate = false;
		this.conferenceForm.reset();
		this.selectedType = '';
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
	}
	selectModerator(item) {
		this.selectedModerator = item.source.value;
		this.selectedModerator.type = 'moderator';
	}
	selectVenue(item) {
		this.selectedVenue = item.source.value;
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
		const people = [];
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
			data = {
				name: this.conferenceForm.get('name').value,
				description: this.conferenceForm.get('description').value,
				to: this.conferenceForm.get('to').value,
				from: this.conferenceForm.get('from').value,
				type: this.selectedType,
				participant: this.conferenceForm.get('firesideChat').value,
				venue: this.selectedVenue,
				actualDate: this.selectedDay,
				tags: 'not yet defined'
			};
		} else if (this.selectedType === 'Panel Discussion') {
			this.conferenceForm.get('panel').value.forEach((element) => {
				people.push(element);
			});
			people.push(this.selectedModerator);
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
				this.toastr.success('Conference created');
				this.selectedType = '';
				this.fetchConference();
			},
			(err) => console.log(err)
		);
	}
	updateConference() {
		let people = [];
		let data;
		if (this.conferenceForm.get('type').value === 'Keynote Speaker') {
			people = [];
			people.push(this.conferenceForm.get('speaker').value);
			data = {
				name: this.conferenceForm.get('name').value,
				description: this.conferenceForm.get('description').value,
				to: this.conferenceForm.get('to').value,
				from: this.conferenceForm.get('from').value,
				type: this.conferenceForm.get('type').value,
				participant: people,
				venue: this.conferenceForm.get('venue').value,
				actualDate: this.conferenceForm.get('day').value,
				tags: 'not yet defined'
			};
		} else if (this.conferenceForm.get('type').value === 'Fireside chat') {
			data = {
				name: this.conferenceForm.get('name').value,
				description: this.conferenceForm.get('description').value,
				to: this.conferenceForm.get('to').value,
				from: this.conferenceForm.get('from').value,
				type: this.conferenceForm.get('type').value,
				participant: this.conferenceForm.get('firesideChat').value,
				venue: this.conferenceForm.get('venue').value,
				actualDate: this.conferenceForm.get('day').value,
				tags: 'not yet defined'
			};
		} else if (this.conferenceForm.get('type').value === 'Panel Discussion') {
			people = [];
			this.conferenceForm.get('panel').value.forEach((element) => {
				people.push(element);
			});
			people.push(this.selectedModerator);
			data = {
				name: this.conferenceForm.get('name').value,
				description: this.conferenceForm.get('description').value,
				to: this.conferenceForm.get('to').value,
				from: this.conferenceForm.get('from').value,
				type: this.conferenceForm.get('type').value,
				participant: people,
				venue: this.conferenceForm.get('venue').value,
				actualDate: this.conferenceForm.get('day').value,
				tags: 'not yet defined'
			};
		}
		console.log(data);
		this.conferenceForm.reset();
	}
	compareFn(o1, o2) {
		if (o1.id === o2.id) {
			return true;
		}
		return false;
	}
}
