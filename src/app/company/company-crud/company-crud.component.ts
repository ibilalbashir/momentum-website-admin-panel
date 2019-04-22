import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { TagsService } from 'src/app/shared/services/tags.service';
import { RegionService } from 'src/app/shared/services/region.service';
import { CompanyService } from 'src/app/shared/services/company.service';

@Component({
	selector: 'app-company-crud',
	templateUrl: './company-crud.component.html',
	styleUrls: [ './company-crud.component.css' ]
})
export class CompanyCrudComponent implements OnInit {
	alreadySelectedCategories = [];
	id;
	ifUpdate = false;
	companyForm: FormGroup;
	category = [];
	selectedCategories = [];
	selectedCountry;
	selectedState;
	selectedCity;
	dataSource;
	shouldOpen = false;
	displayedColumns: string[] = [ 'name', 'description', 'email', 'socialLinks', 'edit' ];

	country = [];
	state = [];
	city = [];
	selectedFile = '';
	image;

	constructor(
		private upload: ImageUploadService,
		private fb: FormBuilder,
		public toastr: ToastrService,
		private tagService: TagsService,
		private region: RegionService,
		private companyService: CompanyService
	) {
		this.companyForm = fb.group({
			name: [ '' ],
			description: [ '' ],
			email: [ '', Validators.email ],
			phone: [ '' ],
			address: [ '' ],
			city: [ '' ],
			country: [ '' ],
			state: [ '' ],
			category: [ '' ],
			facebook: [ '' ],
			twitter: [ '' ],
			linkedin: [ '' ],
			website: [ '' ],
			startup: []
		});
	}
	ngOnInit() {
		this.fetchCompanies();
		this.tagService.getTags().subscribe(
			(val) => {
				this.category = val;
			},
			(err) => console.log(err)
		);

		this.region.getCountry().subscribe(
			(val) => {
				this.country = val;
			},
			(err) => {
				console.log(err);
			}
		);
	}
	cancelUpdate() {
		this.shouldOpen = false;
		this.ifUpdate = false;
		this.companyForm.reset();
		this.selectedFile = '';
	}
	updateCompany() {
		this.shouldOpen = false;
		const data = {
			name: this.companyForm.get('name').value,
			phone: this.companyForm.get('phone').value,
			address: this.companyForm.get('address').value,
			description: this.companyForm.get('description').value,
			image: `${environment.url}/Attachments/momentum-attachments/download/${this.image}`,
			email: this.companyForm.get('email').value,
			category: this.companyForm.get('category').value,
			cityId: this.selectedCity,
			momentumUserId: localStorage.getItem('userId'),
			startup100: this.companyForm.get('startup').value,
			teamMembers: [],
			socialLinks: [
				{
					key: 'Facebook',
					link: this.companyForm.get('facebook').value
				},
				{
					key: 'Twitter',
					link: this.companyForm.get('twitter').value
				},
				{
					key: 'Linkedin',
					link: this.companyForm.get('linkedin').value
				},
				{
					key: 'Website',
					link: this.companyForm.get('website').value
				}
			]
		};
		console.log(data);
		this.companyService.patchCompany(this.id, data).subscribe(
			(val) => {
				this.cancelUpdate();
				this.toastr.success('Company Updated');
				this.fetchCompanies();
				this.selectedFile = '';
			},
			(err) => console.log(err)
		);
	}
	getCompanyData(id) {
		this.shouldOpen = true;
		this.id = id;
		this.ifUpdate = true;

		this.companyService.getCompanyId(id).subscribe((val) => {
			this.companyForm.patchValue({
				name: val.name,
				description: val.description,
				email: val.email,
				phone: val.phone,
				category: val.category,
				address: val.address,
				startup: val.startup100,
				facebook: val.socialLinks[0].link,
				twitter: val.socialLinks[1].link,
				linkedin: val.socialLinks[2].link,
				website: val.socialLinks[3].link
			});
		}, (err) => console.log);
	}
	fetchCompanies() {
		this.companyService.getCompany().subscribe(
			(val) => {
				this.dataSource = val;
			},
			(err) => console.log(err)
		);
	}
	selectCategory(item) {
		this.selectedCategories = item.value;
	}
	selectCountry(item) {
		this.selectedCountry = item.value;
		this.region.getState(this.selectedCountry.id).subscribe(
			(val) => {
				this.state = val;
			},
			(err) => {
				console.log(err);
			}
		);
	}
	selectState(item) {
		this.selectedState = item.value;
		this.region.getCity(this.selectedState.id).subscribe(
			(val) => {
				this.city = val;
			},
			(err) => {
				console.log(err);
			}
		);
	}
	selectCity(item) {
		this.selectedCity = item.value.id;
		console.log(this.selectedCity);
	}

	processFile(e: any) {
		if (e.target.files.length > 0) {
			this.selectedFile = e.target.files[0].name;
			this.upload.uploadImage(e.target.files[0]).subscribe(
				(val) => {
					this.image = val.result.files.image[0].name;
					console.log(this.image);
					console.log(val);
				},
				(err) => console.log(err)
			);
		} else {
			this.selectedFile = '';
		}
	}
	onSubmit() {
		const data = {
			name: this.companyForm.get('name').value,
			phone: this.companyForm.get('phone').value,
			address: this.companyForm.get('address').value,
			description: this.companyForm.get('description').value,
			image: `${environment.url}/Attachments/momentum-attachments/download/${this.image}`,
			email: this.companyForm.get('email').value,
			category: this.companyForm.get('category').value,
			cityId: this.selectedCity,
			momentumUserId: localStorage.getItem('userId'),
			teamMembers: [],
			startup100: this.companyForm.get('startup').value,
			socialLinks: [
				{
					key: 'Facebook',
					link: this.companyForm.get('facebook').value
				},
				{
					key: 'Twitter',
					link: this.companyForm.get('twitter').value
				},
				{
					key: 'Linkedin',
					link: this.companyForm.get('linkedin').value
				},
				{
					key: 'Website',
					link: this.companyForm.get('website').value
				}
			]
		};
		// 	console.log(data);
		this.companyService.postCompany(data).subscribe(
			(val) => {
				console.log(val);
				this.companyForm.reset();
				this.selectedFile = '';
				this.toastr.success('Company Posted');
				this.fetchCompanies();
			},
			(err) => console.log(err)
		);
	}
	ifActive(id, $event) {
		const data = {
			isActive: $event.checked
		};
		this.companyService.patchCompany(id, data).subscribe((val) => console.log(val), (err) => console.log(err));
	}
	// compareFn(o1, o2) {
	// 	console.log(o1 + 'o1');
	// 	console.log(o2 + 'o2');
	// 	if (o1.id === o2.id) {
	// 		return true;
	// 	}
	// 	return false;
	// }
}
