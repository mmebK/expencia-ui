import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/auth/login.service';
import {AppConfig} from '../../../modals/app-config';
import {HttpClient} from '@angular/common/http';
import {UserInfoService} from '../../../services/auth/user-info.service';
import {ApiRequestService} from '../../../services/auth/api-request.service';
import {FormValidators} from "../../../validators/form-validators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  errorMsg: string;


  constructor(private fb: FormBuilder,
              private route: Router,
              private loginService: LoginService,
              private appConfig: AppConfig,
              private httpClient: HttpClient,
              private userInfo: UserInfoService,
              private apiService: ApiRequestService) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, FormValidators.emailsLenghtAndFormat]],
      password: ['', Validators.required]
    });

  }

  ngOnDestroy() {
  }


  /*loginUser() {
    this.httpClient.post(this.appConfig.baseAuthApiPath + "login", this.loginForm.value).subscribe();
  }*/

  loginUser() {
    this.route.navigate(['/dashboard']);

   /* console.log(this.loginForm.value)

    console.log(this.errorMsg)

    this.loginService.login(this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value)

      .subscribe(resp => {
          if (resp.user == undefined || resp.user.token == undefined) {
            this.errorMsg = 'Username or password is incorrect';
            //console.log(this.errorMsg);
            return;
          }

          this.route.navigate(['/dashboard']);
        }
      );

    console.log(this.errorMsg)*/
  }

  createAccount() {
    this.route.navigate(['/register']);
  }


}
