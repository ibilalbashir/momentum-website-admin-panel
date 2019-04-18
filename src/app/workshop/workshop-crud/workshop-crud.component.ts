import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CompanyService } from 'src/app/shared/services/company.service';
import { SpeakerService } from 'src/app/shared/services/speaker.service';
import { WorkshopService } from 'src/app/shared/services/workshop.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-workshop-crud',
	templateUrl: './workshop-crud.component.html',
	styleUrls: [ './workshop-crud.component.css' ]
})
export class WorkshopCrudComponent implements OnInit {
	workshopForm: FormGroup;
	companies = [];
	speakers = [];
	selectedTrainer;
	selectedOrganization;
	displayedColumns: string[] = [ 'name', 'description', 'price', 'tickerUrl', 'capacity' ];
	dataSource;
	constructor(
		private fb: FormBuilder,
		private companyService: CompanyService,
		private speakerService: SpeakerService,
		private workshopService: WorkshopService,
		private toastr: ToastrService
	) {
		this.workshopForm = fb.group({
			name: [ '' ],
			description: [ '' ],
			price: [ '' ],
			capacity: [ '' ],
			tickerUrl: [ '' ],
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
		this.companyService.getCompany().subscribe(
			(val) => {
				this.companies = val;
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
	onSubmit() {
		const courseOutlineArr = this.workshopForm.get('courseOutline').value.split('\n');
		const data = {
			name: this.workshopForm.get('name').value,
			description: this.workshopForm.get('description').value,
			price: this.workshopForm.get('price').value,
			capacity: this.workshopForm.get('capacity').value,
			tickerUrl: this.workshopForm.get('tickerUrl').value,
			trainer: this.selectedTrainer,
			organizedBy: this.selectedOrganization,
			courseOutline: courseOutlineArr
		};
		this.workshopService.postWorkshop(data).subscribe(
			(val) => {
				console.log(data);
				this.toastr.success('Workshop Posted');
				this.workshopForm.reset();
				this.fetchWorkshops();
			},
			(err) => console.log(err)
		);
	}
}
