import { Component, OnInit } from '@angular/core';
import jwt from 'angular2-jwt-simple';
import { Guid } from 'guid-typescript';
import { DateDiff}  from 'date-diff';
import { AuthService } from 'app/auth.service';
import { element } from 'protractor';
import { enumStatusHttp } from 'app/enums';
import Swal from 'sweetalert2';
import { GlobalsService } from 'app/globals.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-basicelements',
  templateUrl: './basicelements.component.html',
  styleUrls: ['./basicelements.component.scss']
})
export class BasicelementsComponent implements OnInit { 
  simpleSlider = 40;
  doubleSlider = [20, 60];
  state_default: boolean = true;
  focus: any;
  

  // VARS ===============
  apiKey : string;
  apiSecret: string;
  url : string;
  expiration : Date;
  emision : Date;
  token : string;
  // =====================

  constructor(private authService : AuthService,
              private globalService : GlobalsService) { }

  ngOnInit() { 
    $('#divReponse').fadeOut( 'slow' );  
  }
  
  GetTokenAuth() {
    this.CleanResponse();
    let payload = this.GetPayload();    
    var token = jwt.encode(payload, this.apiSecret);       
    this.authService.getTokenAuth(this.apiKey, token).subscribe(response =>{      
    }, error => {      
      switch (error.status){
        case enumStatusHttp.OK:
          this.LoadResponse(this.decodeResponse(error), error.url)          
          break;
        default:
          this.showError(error);          
          break;
      }            
    });
  }
  LoadResponse(response : any, url: string){
      this.token = response.jti;
      this.expiration = new Date(response.exp);
      this.emision = new Date(response.iat);
      this.url = url;
      Swal.fire('Token generado correctamente','', 'success');
      $('#divReponse').fadeIn( "slow" );
  }
  decodeResponse(response : any){  
    return jwt.decode(response.error.text, this.apiSecret);    
  }
  GetPayload() {          
    return {
      'Nonce': Guid.create().toJSON().value,
      'Epoch': this.globalService.GetEpoch()
    };
  }  
  showError(error: any): any {
    console.log(error);
    Swal.fire('Oops...', error.statusText, 'error');
    this.CleanResponse();
  }
  CleanResponse(){ 
    $('#divReponse').fadeOut( "slow" );
    this.url = null;
    this.expiration = null;
    this.emision = null;
    this.token = null;
  }
}
