import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../user/user-rest.service';

@Injectable({
  providedIn: 'root',
})
export class HotelRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.userRest.getToken(),
  });

  constructor(private http: HttpClient, private userRest: UserRestService) {}

  //* Administrador ---------------------------------------------------------------------------------------
  addHotelOnlyAdmin(params: {}) {
    return this.http.post(
      environment.baseUrl + 'hotel/addHotel_OnlyAdmin',
      params,
      {
        headers: this.httpOptions,
      }
    );
  }

  getHotelsOnlyAdmin() {
    return this.http.get(environment.baseUrl + 'hotel/getHotels_OnlyAdmin', {
      headers: this.httpOptions,
    });
  }

  getHotelOnlyAdmin(id: string) {
    return this.http.get(
      environment.baseUrl + 'hotel/getHotel_OnlyAdmin/' + id,
      {
        headers: this.httpOptions,
      }
    );
  }

  updateHotelOnlyAdmin(params: {}, id: string) {
    return this.http.put(
      environment.baseUrl + 'hotel/updateHotel_OnlyAdmin/' + id,
      params,
      {
        headers: this.httpOptions,
      }
    );
  }

  deleteHotelOnlyAdmin(id: string) {
    return this.http.delete(
      environment.baseUrl + 'hotel/deleteHotel_OnlyAdmin/' + id,
      {
        headers: this.httpOptions,
      }
    );
  }

  //* Administrador del hotel ---------------------------------------------------------------------------------------
  addHotel(params: {}) {
    return this.http.post(environment.baseUrl + 'hotel/addHotel', params, {
      headers: this.httpOptions,
    });
  }

  getHotels() {
    return this.http.get(environment.baseUrl + 'hotel/getHotels', {
      headers: this.httpOptions,
    });
  }

  getHotel(id: string) {
    return this.http.get(environment.baseUrl + 'hotel/getHotel/' + id, {
      headers: this.httpOptions,
    });
  }

  updateHotel(params: {}, id: string) {
    return this.http.put(
      environment.baseUrl + 'hotel/updateHotel/' + id,
      params,
      {
        headers: this.httpOptions,
      }
    );
  }

  deleteHotel(id: string) {
    return this.http.delete(environment.baseUrl + 'hotel/deleteHotel/' + id, {
      headers: this.httpOptions,
    });
  }

  requestFiles(hotelId: string, files: Array<File>, name: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      let uri = environment.baseUrl + 'hotel/uploadImageHotel/' + hotelId;

      for (var x = 0; x < files.length; x++) {
        formData.append(name, files[x], files[x].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', uri, true);
      xhr.setRequestHeader('Authorization', this.userRest.getToken());
      xhr.send(formData);
    });
  }

  //* Clientes no registrados ---------------------------------------------------------------------------------------
  getHotelsUnregisteredUser() {
    return this.http.get(environment.baseUrl + 'hotel/getHotels_NoClients', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  //* Clientes registrados ---------------------------------------------------------------------------------------
  getHotelsClient() {
    return this.http.get(environment.baseUrl + 'hotel/getHotels_Clients', {
      headers: this.httpOptions,
    });
  }

  getHotelClient(hotelId: string) {
    return this.http.get(
      environment.baseUrl + 'hotel/getHotel_Clients/' + hotelId,
      {
        headers: this.httpOptions,
      }
    );
  }
}
