import {Component, ElementRef, OnInit} from '@angular/core';
import {ROUTES} from '../sidebar/sidebar.component';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/auth/login.service';
import {ApiRequestService} from '../../../services/auth/api-request.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public userName;
  public focus;
  public listTitles: any[];
  public location: Location;


  constructor(location: Location,
              private element: ElementRef,
              private router: Router,
              private loginService: LoginService,
              private apiService: ApiRequestService) {
    this.location = location;

  }

  async ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    //this.userName = this.loginService.loginInfoReturn.user.username;
    this.userName = await this.loginService.getUserInfos();

    // this.loginService.getUserInfos();


  }


  getTitle() {

    return 'Dashboard';
  }

  logOut() {

    this.loginService.logout();
  }


  /*showUser() {
    this.loginService.
  }*/
}
