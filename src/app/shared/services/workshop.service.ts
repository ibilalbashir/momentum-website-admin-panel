import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
	providedIn: 'root'
})
export class WorkshopService {
	constructor(private http: HttpClient) {}
	postWorkshop(obj): Observable<any> {
		return this.http.post(`${environment.url}/Workshops`, obj);
	}
	getWorkshop(): Observable<any> {
		return this.http.get(`${environment.url}/Workshops`);
	}
	getWorkshopById(id): Observable<any> {
		return this.http.get(`${environment.url}/Workshops/${id}`);
	}
	patchWorkshopById(id, data): Observable<any> {
		return this.http.patch(`${environment.url}/Workshops/${id}`, data);
	}
}
