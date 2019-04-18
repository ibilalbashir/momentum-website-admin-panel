import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TagsService {
	constructor(private http: HttpClient) {}
	getTags(): Observable<any> {
		return this.http.get(`${environment.url}/Tags`);
	}
	getTagsById(id): Observable<any> {
		return this.http.get(`${environment.url}/Tags/${id}`);
	}
}
