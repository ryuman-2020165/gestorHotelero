import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/user/user-rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token: any;
  userData: any;

  constructor(private userRest: UserRestService) { }

  ngOnInit(): void {
    this.token = this.userRest.getToken();
    this.userData = this.userRest.getIdentity();
  }

}
