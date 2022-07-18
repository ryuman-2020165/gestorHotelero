import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../user/user-rest.service';

@Injectable({
  providedIn: 'root',
})
export class BillRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.userRest.getToken(),
  });

  constructor(private http: HttpClient, private userRest: UserRestService) {}

  checkInReservation(idHotel: string, idReservation: string) {
    return this.http.get(environment.baseUrl + 'bill/checkInReservation/' + idHotel + '/' + idReservation,
      {
        headers: this.httpOptions,
      }
    );
  }
}
