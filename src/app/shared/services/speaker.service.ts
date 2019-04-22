import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {
  constructor(private http: HttpClient) {}

  postSpeaker(obj): Observable<any> {
    return this.http.post(`${environment.url}/Speakers`, obj);
  }
  getSpeaker(): Observable<any> {
    return this.http.get(
      `${environment.url}/Speakers?filter[order]=sortOrder ASC`
    );
  }
  getSpeakerById(id): Observable<any> {
    return this.http.get(`${environment.url}/Speakers/${id}`);
  }
  patchSpeaker(id, data): Observable<any> {
    return this.http.patch(`${environment.url}/Speakers/${id}`, data);
  }
}
