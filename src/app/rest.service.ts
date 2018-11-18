import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Policies } from './models/policies.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private endpoint = 'https://localhost:44375/api/';
  constructor(private http: HttpClient) { }

  getPolicies(): Observable<any> {
    return this.http.get(this.endpoint + 'policies/').pipe(
      map(this.extractData));
  }

  getPolicy(policy: string): Observable<any> {
    return this.http.get(this.endpoint + 'policies' + policy).pipe(
      map(this.extractData));
  }

  postPolicy(policy: Policies): Observable<any> {
    return this.http.post(this.endpoint + 'policies', policy).pipe(
      map(this.extractData));
  }

  getClients(): Observable<any> {
    return this.http.get(this.endpoint + 'clients').pipe(
      map(this.extractData));
  }

  getTypes(): Observable<any> {
    return this.http.get(this.endpoint + '/policies/types').pipe(
      map(this.extractData));
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
}