import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/user/user-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(private userRest: UserRestService) {
    this.user = new UserModel('', '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.getUsersAdmin();
  }
  searchUser: string = '';

  user: UserModel;
  users: any;
  userGetId: any;

  addUserAdmin(addUserForm: any) {
    this.userRest.addUserAdmin(this.user).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        this.getUsersAdmin();
        addUserForm.reset();
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getUsersAdmin() {
    this.userRest.getUsersAdmin().subscribe({
      next: (res: any) => {
        this.users = res.users;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getUserAdmin(id: string) {
    this.userRest.getUserAdmin(id).subscribe({
      next: (res: any) => {
        this.userGetId = res.user;
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  updateUserAdmin() {
    this.userGetId.password = undefined;
    this.userGetId.reservations = undefined;
    this.userGetId.history = undefined;
    this.userGetId.bills = undefined;
    this.userGetId.image = undefined;

    this.userRest
      .updateUserAdmin(this.userGetId, this.userGetId._id)
      .subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: res.message,
          });
          this.getUsersAdmin();
        },
        error: (err) => {
          Swal.fire({
            icon: 'warning',
            title: err.error.message || err.error,
          });
        },
      });
  }

  deleteUserAdmin(id: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este hotel?',
      text: '¡Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, quiero eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userRest.deleteUserAdmin(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              icon: 'success',
              title: res.message,
            });

            this.getUsersAdmin();
          },
          error: (err: any) => {
            Swal.fire({
              icon: 'warning',
              title: err.error.message || err.error,
            });
          },
        });
      }
    });
  }
}
