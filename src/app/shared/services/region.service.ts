import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class RegionService {
	constructor(private http: HttpClient) {}
	getCountry(): Observable<any> {
		return this.http.get(`${environment.url}/Countries`);
	}
	getState(id): Observable<any> {
		return this.http.get(`${environment.url}/Countries/${id}/States/`);
	}
	getCity(id): Observable<any> {
		return this.http.get(`${environment.url}/States/${id}/cities`);
	}
}
