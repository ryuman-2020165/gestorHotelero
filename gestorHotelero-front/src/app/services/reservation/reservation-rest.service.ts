import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../user/user-rest.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.userRest.getToken(),
  });

  constructor(private http: HttpClient, private userRest: UserRestService) {}

  //* Administrador del hotel ---------------------------------------------------------------------------------------
  getReservations(idHotel: string) {
    return this.http.get(
      environment.baseUrl + 'reservation/getReservations/' + idHotel,
      {
        headers: this.httpOptions,
      }
    );
  }

  getReservationsInProgress(idHotel: string) {
    return this.http.get(
      environment.baseUrl + 'reservation/getReservationsInProgress/' + idHotel,
      {
        headers: this.httpOptions,
      }
    );
  }

  getReservationsBilled(idHotel: string) {
    return this.http.get(
      environment.baseUrl + 'reservation/getReservationsBilled/' + idHotel,
      {
        headers: this.httpOptions,
      }
    );
  }

  getReservationsCancelled(idHotel: string) {
    return this.http.get(
      environment.baseUrl + 'reservation/getReservationsCancelled/' + idHotel,
      {
        headers: this.httpOptions,
      }
    );
  }

  getReservationsCancelledAndBilled(idHotel: string) {
    return this.http.get(
      environment.baseUrl + 'reservation/getReservationsCancelledAndBilled/' + idHotel,
      {
        headers: this.httpOptions,
      }
    );
  }

  getReservation(idHotel: string, idReservation: string) {
    return this.http.get(
      environment.baseUrl +
        'reservation/getReservation/' +
        idHotel +
        '/' +
        idReservation,
      {
        headers: this.httpOptions,
      }
    );
  }

  deleteServiceReservation(
    idHotel: string,
    idReservation: string,
    idServiceReservation: string
  ) {
    return this.http.delete(
      environment.baseUrl +
        'reservation/deleteServiceReservation/' +
        idHotel +
        '/' +
        idReservation +
        '/' +
        idServiceReservation,
      {
        headers: this.httpOptions,
      }
    );
  }

  cancelReservation(idHotel: string, idReservation: string) {
    return this.http.delete(
      environment.baseUrl +
        'reservation/cancelReservation/' +
        idHotel +
        '/' +
        idReservation,
      {
        headers: this.httpOptions,
      }
    );
  }

  //* Usuario registrado ---------------------------------------------------------------------------------------
  reserveRoom(params: {}, idHotel: string, idRoom: string) {
    return this.http.post(
      environment.baseUrl + 'reservation/reserveRoom/' + idHotel + '/' + idRoom,
      params,
      {
        headers: this.httpOptions,
      }
    );
  }

  myReserve() {
    return this.http.get(environment.baseUrl + 'reservation/myReserve', {
      headers: this.httpOptions,
    });
  }

  addServiceMyReserve(params: {}, idService: string) {
    return this.http.post(
      environment.baseUrl + 'reservation/addServiceMyReserve/' + idService,
      params,
      {
        headers: this.httpOptions,
      }
    );
  }
}
