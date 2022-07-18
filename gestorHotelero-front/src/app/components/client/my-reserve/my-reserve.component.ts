import { Component, OnInit } from '@angular/core';

import { HotelRestService } from 'src/app/services/hotel/hotel-rest.service';
import { RoomRestService } from 'src/app/services/room/room-rest.service';
import { ServiceRestService } from 'src/app/services/service/service-rest.service';
import { EventRestService } from 'src/app/services/event/event-rest.service';
import { ReservationRestService } from 'src/app/services/reservation/reservation-rest.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-reserve',
  templateUrl: './my-reserve.component.html',
  styleUrls: ['./my-reserve.component.css'],
})
export class MyReserveComponent implements OnInit {
  constructor(
    private hotelRest: HotelRestService,
    private roomRest: RoomRestService,
    private serviceRest: ServiceRestService,
    private eventRest: EventRestService,
    private reservationRest: ReservationRestService
  ) {}

  ngOnInit(): void {
    this.myReserve();
  }

  reserve: any;
  reserveExist: boolean = true;

  hotel: any;
  hotelGetId: any;

  room: any;
  roomGetId: any;

  services: any;
  searchService: string = '';

  servicesHotel: any;
  servicesHotelLenght: any;
  serviceHotelGetId: any;
  serviceHotelGetData: any;

  eventsHotel: any;
  eventsHotelLenght: any;
  searchEvent: string = '';

  quantity: any;
  price: any;

  myReserve() {
    this.reservationRest.myReserve().subscribe({
      next: (res: any) => {
        this.reserve = res.myReservation;
        this.services = res.services;
        this.getHotel();
      },
      error: (err: any) => {
        this.reserveExist = false;
      },
    });
  }

  getHotel() {
    this.hotelGetId = this.reserve.hotel._id;
    this.hotelRest.getHotelClient(this.reserve.hotel._id).subscribe({
      next: (res: any) => {
        this.hotel = res.hotel;
        this.getRoom();
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getRoom() {
    this.roomGetId = this.reserve.room._id;
    this.roomRest.getRoomClient(this.hotelGetId, this.roomGetId).subscribe({
      next: (res: any) => {
        this.room = res.room;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getServicesClient() {
    this.serviceRest.getServicesClient(this.hotelGetId).subscribe({
      next: (res: any) => {
        this.servicesHotel = res.services;
        if (this.servicesHotel.length == 0) {
          this.servicesHotelLenght = 0;
        } else {
          this.servicesHotelLenght = this.servicesHotel.length;
        }
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getEventsClient() {
    this.eventRest.getEventsClient(this.hotelGetId).subscribe({
      next: (res: any) => {
        this.eventsHotel = res.events;
        if (this.eventsHotel.length == 0) {
          this.eventsHotelLenght = 0;
        } else {
          this.eventsHotelLenght = this.eventsHotel.length;
        }
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getIdServiceHotel(idService: string, data: {}) {
    this.serviceHotelGetId = idService;
    this.serviceHotelGetData = data;
  }

  calculatePrice() {
    this.price = this.quantity * this.serviceHotelGetData.price;
  }

  addServiceMyReserve(addServiceForm: any) {
    Swal.fire({
      text: '¿Estás seguro de añaidir este servicio?',
      title: 'Revisa bien antes la cantidad',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, quiero añadirlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        let params = {
          quantity: this.quantity
        }
        this.price = 0;
        this.reservationRest
          .addServiceMyReserve(params, this.serviceHotelGetId)
          .subscribe({
            next: (res: any) => {
              this.myReserve();
              addServiceForm.reset();
              Swal.fire({
                icon: 'success',
                title: 'Se añadió el servicio a tu reservación',
              });
            },
            error: (err: any) => {
              Swal.fire({
                icon: 'warning',
                title:
                  'Ocurrió un problema añadir el servicio a tu reservación',
              });
            },
          });
      }
    });
  }
}
