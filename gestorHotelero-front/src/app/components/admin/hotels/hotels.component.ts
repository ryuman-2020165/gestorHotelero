import { Component, OnInit } from '@angular/core';

import { HotelRestService } from 'src/app/services/hotel/hotel-rest.service';
import { UserRestService } from 'src/app/services/user/user-rest.service';

import { HotelModel } from 'src/app/models/hotel.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
})
export class HotelsComponent implements OnInit {
  constructor(
    private hotelRest: HotelRestService,
    private userRest: UserRestService
  ) {
    this.hotel = new HotelModel('', '', '', '', '');
  }

  ngOnInit(): void {
    this.getHotelsOnlyAdmin();
    this.getUsersHotelAdmin();
  }

  searchHotel: String = '';
  hotelGetId: any;

  users: any;

  hotel: HotelModel;
  hotels: any;
  hotelGetData: any;

  getUsersHotelAdmin() {
    this.userRest.getUsersHotelAdmin().subscribe({
      next: (res: any) => {
        this.users = res.users;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  addHotelOnlyAdmin(addHotelForm: any) {
    this.hotelRest.addHotelOnlyAdmin(this.hotel).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        this.getHotelsOnlyAdmin();
        addHotelForm.reset();
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getHotelsOnlyAdmin() {
    this.hotelRest.getHotelsOnlyAdmin().subscribe({
      next: (res: any) => {
        this.hotels = res.hotels;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getHotelOnlyAdmin(id: string) {
    this.hotelRest.getHotelOnlyAdmin(id).subscribe({
      next: (res: any) => {
        this.hotelGetData = res.hotel;
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  updateHotelOnlyAdmin() {
    this.hotelGetData.image = undefined;
    this.hotelGetData.timesRequest = undefined;

    this.hotelRest
      .updateHotelOnlyAdmin(this.hotelGetData, this.hotelGetData._id)
      .subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: res.message,
          });
          this.getHotelsOnlyAdmin();
        },
        error: (err) => {
          Swal.fire({
            icon: 'warning',
            title: err.error.message || err.error,
          });
        },
      });
  }

  deleteHotelOnlyAdmin(id: string) {
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
        this.hotelRest.deleteHotelOnlyAdmin(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              icon: 'success',
              title: res.message,
            });
            this.getHotelsOnlyAdmin();
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
