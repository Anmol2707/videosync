import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Username } from '../Interfaces/Username';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpService: HttpClient) { }

  public getData = (route: string) => {
    return this.httpService.get(route);
  }

  submit(userName: Username): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpService.post<Username>('http://localhost:8080/api/userName', JSON.stringify(userName), {headers});
  }
}
