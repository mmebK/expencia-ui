import {Injectable} from '@angular/core';
import {ApiRequestService} from './api-request.service';
import {Router} from '@angular/router';
import {LoginInfoInStorage, UserInfoService} from './user-info.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';


export interface LoginRequestParam {
  email: string;
  password: string;
}

export interface RegisterRequestParam {
  firstName: string
  lastName: string;
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]); // Will use this BehaviorSubject to emit data that we want after ajax login attempt
  loginInfoReturn: LoginInfoInStorage;

  landingPage: string = 'dashboard';

  constructor(private router: Router,
              private userInfoService: UserInfoService,
              private apiRequest: ApiRequestService) {

  }

  login(email: string, password: string): Observable<any> {

    let token;
    //console.log('login called');
    let dataBody: LoginRequestParam = {

      'email': email,
      'password': password
    };

    let jwtHelper = new JwtHelperService();
    //console.log('**1**the token from userInfo is:' + this.userInfoService.getUserInfo());


    this.apiRequest.post('login', dataBody).subscribe(
      resp => {

        if (resp !== undefined && resp !== null) {
          let jwt = resp.headers.get('Authorization');
          let objJWT = jwtHelper.decodeToken(jwt);
          let userId = objJWT.sub;
          // console.log('the user id is ' + userId);

          //  console.log('the jwt is ' + jwt);
          //Create a success object that we want to send back to login page
          //  console.log(resp);
          this.loginInfoReturn = {
            'success': true,
            'landingPage': this.landingPage,
            'user': {
              'username': userId,
              'token': jwt,
            }
          };

          // store userId and jwt token in session storage to keep user logged in between page refreshes
          this.userInfoService.storeUserInfo(JSON.stringify(this.loginInfoReturn.user.token));

        } else {
          //Create a faliure object that we want to send back to login page
          this.loginInfoReturn = {
            'success': false,
            'landingPage': '/login'
          };
        }

        this.loginDataSubject.next(this.loginInfoReturn);
      },
      err => {
        this.loginInfoReturn = {
          'success': false,
          'landingPage': '/login'
        };
      });

    //this.getUserInfos();

    console.log(this.loginInfoReturn)
    return this.loginDataSubject;
  }


  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    let loginDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    let loginInfoReturn: LoginInfoInStorage;
    let token;

    let dataBody: RegisterRequestParam = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };

    this.apiRequest.post('register', dataBody).subscribe(
      resp => {
        if (resp.status === 200) {
          loginInfoReturn = {
            'success': true,
            'landingPage': this.landingPage
          };
        }
        loginDataSubject.next(loginInfoReturn);
      },
      err => {
        loginInfoReturn = {
          'success': false,
          'landingPage': '/login'
        };
        loginDataSubject.next(loginInfoReturn);
      }
    );


    return loginDataSubject;
  }

  logout() {
    //console.log('logout called');
    this.userInfoService.removeUserInfo();
    this.router.navigate(['/login']);
  }

  async getUserInfos() {
    console.log('get infos called');

    await this.apiRequest.get('currentUser').then(resp => {
      console.log(resp);
      if (resp) {
        this.loginInfoReturn = {
          'success': true,
          'landingPage': this.landingPage,
          'user': {
            username: resp.lastName,

          }
        };

      }
      console.log(this.loginInfoReturn)
      this.loginDataSubject.next(this.loginInfoReturn);
    });
    return this.loginInfoReturn.user.username;
  }
}
