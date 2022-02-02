/*
import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  private userInfoService: any;

  constructor() {
  }

  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    let token = this.userInfoService.getStoredToken();
    if (token !== null) {
      headers = headers.append('Authorization', token);
    }
    return headers;
  }


}
*/
