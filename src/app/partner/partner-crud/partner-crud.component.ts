import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { PartnerService } from 'src/app/shared/services/partner.service';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
	selector: 'app-partner-crud',
	templateUrl: './partner-crud.component.html',
	styleUrls: [ './partner-crud.component.css' ]
})
export class PartnerCrudComponent implements OnInit {
	id;
	selectedCat;
	image;
	ifUpdate = false;
	showOnFront = false;
	selectedFile = '';
	partnerForm: FormGroup;
	options: SortablejsOptions;
	displayedColumns: string[] = [ 'name', 'description', 'category', 'socialLinks', 'edit' ];
	category = [];
	dataSource;

	constructor(
		private fb: FormBuilder,
		private partnerService: PartnerService,
		private toastr: ToastrService,
		private upload: ImageUploadService
	) {
		this.partnerForm = this.fb.group({
			name: [ '' ],
			showFront: [],
			category: [],
			description: [ '' ],
			linkFacebook: [ '' ],
			linkTwitter: [ '' ],
			linkLinkedin: [ '' ],
			linkWebsite: [ '' ]
		});
	}
	updatePartners() {
		const obj = {
			name: this.partnerForm.get('name').value,
			category: this.partnerForm.get('category').value,
			description: this.partnerForm.get('description').value,
			image: `${environment.url}/Attachments/momentum-attachments/download/${this.image}`,
			showOnFront: this.partnerForm.get('showFront').value,
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
		this.partnerService.update(this.id, obj).subscribe(
			(val) => {
				this.partnerForm.reset();
				this.toastr.success('Partner Updated');
				this.selectedFile = '';
				this.ifUpdate = false;
			},
			(err) => console.log(err)
		);
	}
	cancelUpdate() {
		this.ifUpdate = false;
		this.partnerForm.reset();
		this.selectedFile = '';
	}
	getPartnersById(id) {
		this.ifUpdate = true;
		this.id = id;
		this.partnerService.getPartnersById(id).subscribe(
			(val) => {
				console.log(val);
				this.partnerForm.patchValue({
					name: val.name,
					description: val.description,
					showFront: val.showOnFront,
					category: val.category,
					linkFacebook: val.socialLinks[0].link,
					linkTwitter: val.socialLinks[1].link,
					linkLinkedin: val.socialLinks[2].link,
					linkWebsite: val.socialLinks[3].link
				});
			},
			(err) => console.log(err)
		);
	}
	ngOnInit() {
		this.partnerService.getTags().subscribe(
			(val) => {
				console.log(val, 'categories');
				this.category = val;
			},
			(err) => console.log(err)
		);
		this.fetchPartners();
		this.options = {
			onUpdate: (e) => {
				console.log(this.dataSource);
				this.dataSource = this.dataSource.map((x, index) => {
					return { ...x, sortOrder: index };
				});
				this.update();
			}
		};
	}
	update() {
		this.dataSource.forEach((element) => {
			this.partnerService.update(element.id, element).subscribe();
		});
	}
	fetchPartners() {
		this.partnerService.getPartner().subscribe(
			(val) => {
				// this.dataSource = new MatTableDataSource<any>(val);
				this.dataSource = val;
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
	ifTrue(item) {
		this.showOnFront = item.checked;
	}
	onSubmit() {
		const obj = {
			name: this.partnerForm.get('name').value,
			category: this.selectedCat,
			description: this.partnerForm.get('description').value,
			image: `${environment.url}/Attachments/momentum-attachments/download/${this.image}`,
			showOnFront: this.showOnFront,
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
	ifActive(id, $event) {
		console.log(id, $event);
		const data = {
			isActive: $event.checked
		};
		this.partnerService.update(id, data).subscribe((val) => console.log(val), (err) => console.log(err));
	}
}
