import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CompanyService } from 'src/app/shared/services/company.service';
import { SpeakerService } from 'src/app/shared/services/speaker.service';
import { WorkshopService } from 'src/app/shared/services/workshop.service';
import { ToastrService } from 'ngx-toastr';
import { PartnerService } from 'src/app/shared/services/partner.service';

@Component({
	selector: 'app-workshop-crud',
	templateUrl: './workshop-crud.component.html',
	styleUrls: [ './workshop-crud.component.css' ]
})
export class WorkshopCrudComponent implements OnInit {
	ifUpdate = false;
	workshopForm: FormGroup;
	finalString = '';
	id;
	partners = [];
	speakers = [];
	selectedTrainer;
	selectedOrganization;
	displayedColumns: string[] = [ 'name', 'description', 'price', 'tickerUrl', 'capacity', 'edit' ];
	dataSource;
	constructor(
		private fb: FormBuilder,
		private partnerService: PartnerService,
		private speakerService: SpeakerService,
		private workshopService: WorkshopService,
		private toastr: ToastrService
	) {
		this.workshopForm = fb.group({
			name: [ '' ],
			description: [ '' ],
			price: [ '' ],
			capacity: [ '' ],
			ticketUrl: [ '' ],
			courseOutline: [ '' ],
			organization: [ '' ],
			trainer: [ '' ]
		});
	}
	selectSpeaker(item) {
		this.selectedTrainer = item.value.id;
	}
	selectCompany(item) {
		this.selectedOrganization = item.value.id;
	}
	ngOnInit() {
		this.fetchWorkshops();
		this.partnerService.getPartner().subscribe(
			(val) => {
				this.partners = val;
			},
			(err) => console.log(err)
		);

		this.speakerService.getSpeaker().subscribe(
			(val) => {
				this.speakers = val;
			},
			(err) => console.log(err)
		);
	}
	fetchWorkshops() {
		this.workshopService.getWorkshop().subscribe(
			(val) => {
				this.dataSource = val;
			},
			(err) => console.log(err)
		);
	}
	getWorkshopById(id) {
		this.ifUpdate = true;
		this.id = id;
		this.finalString = '';
		this.workshopService.getWorkshopById(id).subscribe(
			(val) => {
				val.courseOutline.forEach((element) => {
					this.finalString += element;
					this.finalString += '\n';
				});

				this.workshopForm.patchValue({
					name: val.name,
					description: val.description,
					price: val.price,
					capacity: val.capacity,
					ticketUrl: val.tickerUrl,
					trainer: val.trainer,
					organization: val.organizedBy,
					courseOutline: this.finalString
				});
			},
			(err) => console.log(err)
		);
	}
	cancelUpdate() {
		this.ifUpdate = false;
		this.finalString = '';
		this.workshopForm.reset();
	}
	updateWorkshop() {
		const data = {
			name: this.workshopForm.get('name').value,
			description: this.workshopForm.get('description').value,
			price: this.workshopForm.get('price').value,
			capacity: this.workshopForm.get('capacity').value,
			tickerUrl: this.workshopForm.get('ticketUrl').value,
			trainer: this.workshopForm.get('trainer').value,
			organizedBy: this.workshopForm.get('organization').value,

			lastUpdated: new Date()
		};
		this.workshopService.patchWorkshopById(this.id, data).subscribe(
			(val) => {
				console.log(val);
				this.workshopForm.reset();
				this.ifUpdate = false;
				this.toastr.success('Workshop Updated.');
				this.finalString = '';
				this.fetchWorkshops();
			},
			(err) => console.log(err)
		);
	}
	onSubmit() {
		const courseOutlineArr = this.workshopForm.get('courseOutline').value.split('\n');
		const data = {
			name: this.workshopForm.get('name').value,
			description: this.workshopForm.get('description').value,
			price: this.workshopForm.get('price').value,
			capacity: this.workshopForm.get('capacity').value,
			tickerUrl: this.workshopForm.get('ticketUrl').value,
			trainer: this.workshopForm.get('trainer').value,
			organizedBy: this.workshopForm.get('organization').value,
			courseOutline: courseOutlineArr,
			created: new Date()
		};

		this.workshopService.postWorkshop(data).subscribe(
			(val) => {
				this.toastr.success('Workshop Posted');
				this.workshopForm.reset();
				this.fetchWorkshops();
			},
			(err) => console.log(err)
		);
	}
}
