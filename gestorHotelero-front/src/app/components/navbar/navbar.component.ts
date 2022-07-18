import { Component, OnInit, DoCheck } from '@angular/core';
import { UserRestService } from 'src/app/services/user/user-rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, DoCheck {
  token: any;
  userData: any;
  uri: any;
  userImage: any;

  constructor(private userRest: UserRestService) {}

  ngOnInit(): void {
    this.token = this.userRest.getToken();
    this.userData = this.userRest.getIdentity();

    if (this.token != '' && this.userData.hasOwnProperty('image') == true) {
      this.userImage = this.userRest.getIdentity().image;
      this.uri = environment.baseUrl + 'user/getImage/' + this.userImage;
    }
  }

  ngDoCheck(): void {
    this.token = this.userRest.getToken();
    this.userData = this.userRest.getIdentity();

    if (this.token != '' && this.userData.hasOwnProperty('image') == true) {
      this.userImage = this.userRest.getIdentity().image;
      this.uri = environment.baseUrl + 'user/getImage/' + this.userImage;
    }
  }

  logOut() {
    localStorage.clear();
  }
}
