import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../user/user-rest.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.userRest.getToken(),
  });

  constructor(private http: HttpClient, private userRest: UserRestService) {}

  //* Administrador del hotel ---------------------------------------------------------------------------------------
  addService(params: {}) {
    return this.http.post(environment.baseUrl + 'service/addService', params, {
      headers: this.httpOptions,
    });
  }

  getServices(idHotel: string) {
    return this.http.get(
      environment.baseUrl + 'service/getServices/' + idHotel,
      {
        headers: this.httpOptions,
      }
    );
  }

  getService(idHotel: string, idService: string) {
    return this.http.get(
      environment.baseUrl + 'service/getService/' + idHotel + '/' + idService,
      {
        headers: this.httpOptions,
      }
    );
  }

  updateService(params: {}, idHotel: string, idService: string) {
    return this.http.put(
      environment.baseUrl +
        'service/updateService/' +
        idHotel +
        '/' +
        idService,
      params,
      {
        headers: this.httpOptions,
      }
    );
  }

  deleteService(idHotel: string, idService: string) {
    return this.http.delete(
      environment.baseUrl +
        'service/deleteService/' +
        idHotel +
        '/' +
        idService,
      {
        headers: this.httpOptions,
      }
    );
  }

  //* Clientes registrados ---------------------------------------------------------------------------------------
  getServicesClient(idHotel: string) {
    return this.http.get(
      environment.baseUrl + 'service/getServices_Clients/' + idHotel,
      {
        headers: this.httpOptions,
      }
    );
  }
}
