import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ConferenceService {
	constructor(private http: HttpClient) {}

	postConference(obj): Observable<any> {
		return this.http.post(`${environment.url}/Conferences`, obj);
	}
	getConference(): Observable<any> {
		return this.http.get(`${environment.url}/Conferences`);
	}
	getConferenceById(id): Observable<any> {
		return this.http.get(`${environment.url}/Conferences/${id}`);
	}
}
