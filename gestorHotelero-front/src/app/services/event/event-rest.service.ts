import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../user/user-rest.service';

@Injectable({
  providedIn: 'root',
})
export class EventRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.userRest.getToken(),
  });

  constructor(private http: HttpClient, private userRest: UserRestService) {}

  //* Administrador del hotel ---------------------------------------------------------------------------------------
  addEvent(params: {}) {
    return this.http.post(environment.baseUrl + 'event/addEvent', params, {
      headers: this.httpOptions,
    });
  }

  getEvents(idHotel: string) {
    return this.http.get(environment.baseUrl + 'event/getEvents/' + idHotel, {
      headers: this.httpOptions,
    });
  }

  getEvent(idHotel: string, idEvent: string) {
    return this.http.get(
      environment.baseUrl + 'event/getEvent/' + idHotel + '/' + idEvent,
      {
        headers: this.httpOptions,
      }
    );
  }

  updateEvent(params: {}, idHotel: string, idEvent: string) {
    return this.http.put(
      environment.baseUrl + 'event/updateEvent/' + idHotel + '/' + idEvent,
      params,
      {
        headers: this.httpOptions,
      }
    );
  }

  deleteEvent(idHotel: string, idEvent: string) {
    return this.http.delete(
      environment.baseUrl + 'event/deleteEvent/' + idHotel + '/' + idEvent,
      {
        headers: this.httpOptions,
      }
    );
  }

  //* Clientes registrados ---------------------------------------------------------------------------------------
  getEventsClient(idHotel: string) {
    return this.http.get(
      environment.baseUrl + 'event/getEvents_Clients/' + idHotel,
      {
        headers: this.httpOptions,
      }
    );
  }
}
