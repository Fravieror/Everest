import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalsService } from 'app/globals.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private globals : GlobalsService) { }
  getTokenAuth(apiKey : string, apiSecret : string){
    let endPoint = '/app/auth/signin';
    const httpOptions = {
      headers: new HttpHeaders({
        'X-PRO-Auth-App': apiKey,
        'X-PRO-Auth-Payload': apiSecret        
      })
    }
    return this.http
    .post(this.globals.Ip + endPoint, null, httpOptions);;
  }
}
