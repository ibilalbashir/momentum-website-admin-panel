import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private http: HttpClient) {}
	login(obj): Observable<any> {
		return this.http.post(`${environment.url}/Administrators/login`, obj);
	}
	loggedIn() {
		return !!localStorage.getItem('MomentumToken');
	}
}
