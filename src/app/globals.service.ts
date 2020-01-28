import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  Ip = 'http://190.60.234.203:8082/api'
  constructor() { }
  GetEpoch(){
    let dateNow = new Date();
    let miliseconds = Date.UTC(dateNow.getFullYear(),dateNow.getMonth(), 
                    dateNow.getDate(), dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds(),
                    dateNow.getMilliseconds());                          
    return miliseconds / 1000;
  }  
}
