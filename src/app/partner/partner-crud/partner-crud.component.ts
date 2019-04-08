import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { PartnerService } from 'src/app/shared/services/partner.service';

@Component({
	selector: 'app-partner-crud',
	templateUrl: './partner-crud.component.html',
	styleUrls: [ './partner-crud.component.css' ]
})
export class PartnerCrudComponent implements OnInit {
	selectedCat;
	image;
	selectedFile = '';
	partnerForm: FormGroup;
	displayedColumns: string[] = [ 'name', 'description', 'category', 'socialLinks' ];
	category = [ 'Sponsor', '	Hackathon Partner', 'Workshop Partner' ];
	dataSource;

	constructor(
		private fb: FormBuilder,
		private partnerService: PartnerService,
		private toastr: ToastrService,
		private upload: ImageUploadService
	) {
		this.partnerForm = this.fb.group({
			name: [ '' ],
			description: [ '' ],
			linkFacebook: [ '' ],
			linkTwitter: [ '' ],
			linkLinkedin: [ '' ],
			linkWebsite: [ '' ]
		});
	}

	ngOnInit() {
		this.fetchPartners();
	}

	fetchPartners() {
		this.partnerService.getPartner().subscribe(
			(val) => {
				this.dataSource = new MatTableDataSource<any>(val);
			},
			(err) => console.log(err)
		);
	}
	processFile(e: any) {
		if (e.target.files.length > 0) {
			this.selectedFile = e.target.files[0].name;

			this.upload.uploadImage(e.target.files[0]).subscribe(
				(val) => {
					this.image = val.result.files.image[0].name;
				},
				(err) => console.log(err)
			);
		} else {
			this.selectedFile = '';
		}
	}
	selectedCategory(item) {
		this.selectedCat = item;
		console.log(item);
	}
	onSubmit() {
		const obj = {
			name: this.partnerForm.get('name').value,
			category: this.selectedCat,
			description: this.partnerForm.get('description').value,
			image: `${environment.url}/Attachments/momentum-attachments/download/${this.image}`,
			socialLinks: [
				{
					key: 'Facebook',
					link: this.partnerForm.get('linkFacebook').value
				},
				{
					key: 'Twitter',
					link: this.partnerForm.get('linkTwitter').value
				},
				{
					key: 'Linkedin',
					link: this.partnerForm.get('linkLinkedin').value
				},
				{
					key: 'Website',
					link: this.partnerForm.get('linkWebsite').value
				}
			]
		};
		// 	console.log(obj);
		this.partnerService.postPartner(obj).subscribe(
			(val) => {
				this.partnerForm.reset();
				this.fetchPartners();
				this.toastr.success('Partner added.');
				this.selectedCat = '';
				this.selectedFile = '';
			},
			(err) => this.toastr.error('Something went wrong, please try again.')
		);
	}
}
