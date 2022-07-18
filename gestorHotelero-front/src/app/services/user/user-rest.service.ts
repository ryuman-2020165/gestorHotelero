import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserRestService {
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  register(params: {}) {
    return this.http.post(environment.baseUrl + 'user/register', params, {
      headers: this.httpOptions,
    });
  }

  login(params: {}) {
    return this.http.post(environment.baseUrl + 'user/login', params, {
      headers: this.httpOptions,
    });
  }

  myProfile() {
    return this.http.get(environment.baseUrl + 'user/myProfile', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  updateProfile(params: {}) {
    return this.http.put(environment.baseUrl + 'user/update', params, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  deleteProfile() {
    return this.http.delete(environment.baseUrl + 'user/delete', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  requestFiles(files: Array<File>, name: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      let uri = environment.baseUrl + 'user/uploadImage';

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
      xhr.setRequestHeader('Authorization', this.getToken());
      xhr.send(formData);
    });
  }

  //* Administrador ---------------------------------------------------------------------------------------
  addUserAdmin(params: {}) {
    return this.http.post(
      environment.baseUrl + 'user/register_OnlyAdmin',
      params,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.getToken(),
        },
      }
    );
  }

  getUsersAdmin() {
    return this.http.get(environment.baseUrl + 'user/getUsers', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  getUsersHotelAdmin() {
    return this.http.get(environment.baseUrl + 'user/getUsersHotelAdmin', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  getUserAdmin(id: string) {
    return this.http.get(environment.baseUrl + 'user/getUser/' + id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      },
    });
  }

  updateUserAdmin(params: {}, id: string) {
    return this.http.put(
      environment.baseUrl + 'user/update_OnlyAdmin/' + id,
      params,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.getToken(),
        },
      }
    );
  }

  deleteUserAdmin(id: string) {
    return this.http.delete(
      environment.baseUrl + 'user/delete_OnlyAdmin/' + id,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.getToken(),
        },
      }
    );
  }

  //* Utilidades ---------------------------------------------------------------------------------------
  getToken() {
    let globalToken = localStorage.getItem('token');
    let token;
    if (globalToken != undefined) {
      token = globalToken;
    } else {
      token = '';
    }
    return token;
  }

  getIdentity() {
    let globalIdentity = localStorage.getItem('identity');
    let identity;
    if (globalIdentity != undefined) {
      identity = JSON.parse(globalIdentity);
    } else {
      identity = '';
    }
    return identity;
  }
}
