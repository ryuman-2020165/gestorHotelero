import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/user/user-rest.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  constructor(private userRest: UserRestService) {}

  ngOnInit(): void {
    this.myProfile();

    this.token = this.userRest.getToken();
    this.userGetData = this.userRest.getIdentity();

    if (this.token != '' && this.userGetData.hasOwnProperty('image') == true) {
      this.userImage = this.userRest.getIdentity().image;
      this.uri = environment.baseUrl + 'user/getImage/' + this.userImage;
    }
  }

  token: any;
  uri: any;
  userImage: any;
  filesToUpload: any;

  userGetData: any;
  user: any;

  filesChange(inputFile: any) {
    this.filesToUpload = <Array<File>>inputFile.target.files;
    console.log(this.filesToUpload);
  }

  uploadImage() {
    this.userRest.requestFiles(this.filesToUpload, 'image').then((res: any) => {
      let resClear = JSON.parse(res);
      if (!resClear.error) {
        Swal.fire({
          icon: 'success',
          title: resClear.message,
        });
        localStorage.setItem('identity', JSON.stringify(resClear.updateUser));
        this.myProfile();
        this.userImage = this.userRest.getIdentity().image;
        this.uri = environment.baseUrl + 'user/getImage/' + this.userImage;
      } else {
        Swal.fire({
          icon: 'success',
          title: res,
        });
      }
    });
  }

  myProfile() {
    this.userRest.myProfile().subscribe({
      next: (res: any) => {
        this.userGetData = res.user;
        console.log(this.userGetData);
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getProfile() {
    this.userRest.myProfile().subscribe({
      next: (res: any) => {
        this.user = res.user;
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  updateProfile() {
    this.user.reservations = undefined;
    this.user.history = undefined;
    this.user.bills = undefined;
    this.user.role = undefined;
    this.user.password = undefined;

    this.userRest.updateProfile(this.user).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        localStorage.setItem('identity', JSON.stringify(res.updateUser));
        this.myProfile();
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  deleteProfile() {
    Swal.fire({
      title: '¿Estás seguro de eliminar tu cuenta?',
      text: '¡Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, quiero eliminarla',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userRest.deleteProfile().subscribe({
          next: (res: any) => {
            Swal.fire({
              icon: 'success',
              title: res.message,
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'warning',
              title: err.error.message || err.error,
            });
          },
        });
        localStorage.clear();
      }
    });
  }
}
