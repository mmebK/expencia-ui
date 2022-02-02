import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../../modals/app-config";
import {Router} from "@angular/router";
import {UserInfoService} from "../auth/user-info.service";
import {ApiRequestService} from "../auth/api-request.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig,
    private router: Router,
    private userInfoService: UserInfoService,
    private apiRequestService: ApiRequestService) {
  }


  getUserInfo(): Promise<any> {
    return this.http.get(this.appConfig.baseAuthApiPath + "currentUser", {headers: this.apiRequestService.getHeaders()}).toPromise()
  }

  updateUserInfo(data) {
    return this.http.put(this.appConfig.baseAuthApiPath + "updateUserInfo", data, {headers: this.apiRequestService.getHeaders()});
  }
}
