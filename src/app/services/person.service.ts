import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpclient: HttpClient) {

  }

  getAll(): Observable<any> {
    return this.httpclient.get(`${environment.apiUrl}/person`);
  }

  create(person: any): Observable<any> {
    return this.httpclient.post(`${environment.apiUrl}/person`, person);
  }

  update(person: any): Observable<any> {
    return this.httpclient.put(`${environment.apiUrl}/person`, person);
  }

  delete(idPerson: any): Observable<any> {
    return this.httpclient.delete(`${environment.apiUrl}/person/${idPerson}`,);
  }

  getTypeDocument(): Observable<any> {
    return this.httpclient.get(`${environment.apiUrl}/documentType`);
  }
}
