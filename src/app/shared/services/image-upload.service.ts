import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
	providedIn: 'root'
})
export class ImageUploadService {
	constructor(private http: HttpClient) {}
	uploadImage(image: File): Observable<any> {
		const formData = new FormData();
		formData.append('image', image);
		return this.http.post(`${environment.url}/Attachments/momentum-attachments/upload`, formData);
	}
}
