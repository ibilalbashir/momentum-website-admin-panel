import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class PartnerService {
	constructor(private http: HttpClient) {}

	postPartner(obj): Observable<any> {
		return this.http.post(`${environment.url}/Partners`, obj);
	}
	getPartner(): Observable<any> {
		return this.http.get(`${environment.url}/Partners`);
	}
}
