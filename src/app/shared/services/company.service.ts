import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
	providedIn: 'root'
})
export class CompanyService {
	constructor(private http: HttpClient) {}
	postCompany(obj): Observable<any> {
		return this.http.post(`${environment.url}/Companies`, obj);
	}
	getCompany(): Observable<any> {
		return this.http.get(`${environment.url}/Companies`);
	}
	getCompanyId(id): Observable<any> {
		return this.http.get(`${environment.url}/Companies/${id}`);
	}
	patchCompany(id, data): Observable<any> {
		return this.http.patch(`${environment.url}/Companies/${id}`, data);
	}
	postCompanyService(obj): Observable<any> {
		return this.http.post(`${environment.url}/CompanyServices`, obj);
	}
	getCompanyServices(): Observable<any> {
		return this.http.get(`${environment.url}/CompanyServices`);
	}
}
