import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from 'src/app/shared/services/image-upload.service';

@Component({
	selector: 'app-company-crud',
	templateUrl: './company-crud.component.html',
	styleUrls: [ './company-crud.component.css' ]
})
export class CompanyCrudComponent implements OnInit {
	constructor(private upload: ImageUploadService) {}
	ngOnInit() {}
	selectedFile = '';
	image;

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
}
