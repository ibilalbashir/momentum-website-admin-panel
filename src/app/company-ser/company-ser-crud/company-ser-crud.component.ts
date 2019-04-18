import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';
import { CompanyService } from 'src/app/shared/services/company.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-company-ser-crud',
	templateUrl: './company-ser-crud.component.html',
	styleUrls: [ './company-ser-crud.component.css' ]
})
export class CompanySerCrudComponent implements OnInit {
	selectedFile = '';
	image;
	company = [];
	selectedCompany;
	companyServiceForm: FormGroup;
	displayedColumns: string[] = [ 'name', 'description' ];
	dataSource;
	constructor(
		private upload: ImageUploadService,
		private companyService: CompanyService,
		private fb: FormBuilder,
		private toastr: ToastrService
	) {
		this.companyServiceForm = fb.group({
			name: [ '' ],
			description: [ '' ],
			website: [ '' ],
			title: [ '' ]
		});
	}

	selectCompany(item) {
		this.selectedCompany = item.value;
	}
	ngOnInit() {
		this.fetchCompanies();
	}
	fetchCompanies() {
		this.companyService.getCompany().subscribe(
			(val) => {
				this.company = val;
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
	onSubmit() {
		const websiteUrl = [];
		websiteUrl.push(this.companyServiceForm.get('website').value);
		const data = {
			name: this.companyServiceForm.get('title').value,
			image: `${environment.url}/Attachments/momentum-attachments/download/${this.image}`,
			description: this.companyServiceForm.get('description').value,
			urls: websiteUrl,
			companyId: this.selectedCompany.id,
			created: new Date()
		};
		// console.log(data);
		this.companyService.postCompanyService(data).subscribe(
			(val) => {
				this.toastr.success('Company services submitted');
				this.companyServiceForm.reset();
				this.selectedFile = '';
				this.fetchCompanies();
			},
			(err) => console.log(err)
		);
	}
}
