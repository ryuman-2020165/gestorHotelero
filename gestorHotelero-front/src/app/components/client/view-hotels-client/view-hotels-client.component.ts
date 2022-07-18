import { Component, OnInit } from '@angular/core';

import { HotelRestService } from 'src/app/services/hotel/hotel-rest.service';
import { RoomRestService } from 'src/app/services/room/room-rest.service';
import { ServiceRestService } from 'src/app/services/service/service-rest.service';
import { EventRestService } from 'src/app/services/event/event-rest.service';
import { ReservationRestService } from 'src/app/services/reservation/reservation-rest.service';

import { ReserveModel } from 'src/app/models/reserve.model';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-hotels-client',
  templateUrl: './view-hotels-client.component.html',
  styleUrls: ['./view-hotels-client.component.css'],
})
export class ViewHotelsClientComponent implements OnInit {
  constructor(
    private hotelRest: HotelRestService,
    private roomRest: RoomRestService,
    private serviceRest: ServiceRestService,
    private eventRest: EventRestService,
    private reservationRest: ReservationRestService,
    private router: Router
  ) {
    this.reserve = new ReserveModel(new Date(), new Date());
  }

  ngOnInit(): void {
    this.getHotelsClient();
    this.labelFilter = 'Habitaciones disponibles';

    this.today = new Date().toISOString().split('T')[0];
  }

  today: any;

  //* Hoteles ---------------------------------------------------------------------------------------
  searchHotel: String = '';
  hotelGetId: any;
  hotels: any;

  getHotelsClient() {
    this.hotelRest.getHotelsClient().subscribe({
      next: (res: any) => {
        this.hotels = res.hotels;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  //* Habitaciones ---------------------------------------------------------------------------------------
  labelFilter: any;
  searchRoom: String = '';
  roomGetId: any;
  roomGetData: any;
  rooms: any;

  roomsLenght: any;

  toggleSearch() {
    if (this.labelFilter == 'Habitaciones disponibles') {
      this.getRoomsAvailableClient();
      this.labelFilter = 'Habitaciones no disponibles';
    } else if (this.labelFilter == 'Habitaciones no disponibles') {
      this.getRoomsNoAvailableClients();
      this.labelFilter = 'Todas las habitaciones';
    } else if (this.labelFilter == 'Todas las habitaciones') {
      this.getRoomsClient(this.hotelGetId);
      this.labelFilter = 'Habitaciones disponibles';
    }
  }

  getRoomsClient(idHotel: string) {
    this.hotelGetId = idHotel;
    this.labelFilter = 'Habitaciones disponibles';
    this.roomRest.getRoomsClient(idHotel).subscribe({
      next: (res: any) => {
        this.rooms = res.rooms;
        if (this.rooms.length == 0) {
          this.roomsLenght = 0;
        } else {
          this.roomsLenght = this.rooms.length;
        }
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getRoomsAvailableClient() {
    this.roomRest.getRoomsAvailableClient(this.hotelGetId).subscribe({
      next: (res: any) => {
        this.rooms = res.rooms;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getRoomsNoAvailableClients() {
    this.roomRest.getRoomsNoAvailableClients(this.hotelGetId).subscribe({
      next: (res: any) => {
        this.rooms = res.rooms;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  //* Servicios ---------------------------------------------------------------------------------------
  searchService: String = '';
  serviceGetId: any;
  services: any;

  servicesLenght: any;

  getServicesClient(idHotel: string) {
    this.hotelGetId = idHotel;
    this.serviceRest.getServicesClient(idHotel).subscribe({
      next: (res: any) => {
        this.services = res.services;
        if (this.services.length == 0) {
          this.servicesLenght = 0;
        } else {
          this.servicesLenght = this.services.length;
        }
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  //* Eventos ---------------------------------------------------------------------------------------
  searchEvent: String = '';
  eventGetId: any;
  events: any;

  eventsLenght: any;

  getEventsClient(idHotel: string) {
    this.hotelGetId = idHotel;
    this.eventRest.getEventsClient(idHotel).subscribe({
      next: (res: any) => {
        this.events = res.events;
        if (this.events.length == 0) {
          this.eventsLenght = 0;
        } else {
          this.eventsLenght = this.events.length;
        }
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  //* Reservaciones ---------------------------------------------------------------------------------------
  reserve: ReserveModel;
  price: any;
  difference: number = 0;

  calculatePrice() {
    let date1 = new Date(this.reserve.startDate);
    let date2 = new Date(this.reserve.endDate);

    this.difference = date2.getTime() - date1.getTime();

    let totalDays = Math.ceil(this.difference / (1000 * 3600 * 24));
    this.price = this.roomGetData.price * totalDays;
    if (this.price < 0) {
      this.price = 0;
      Swal.fire({
        icon: 'warning',
        title: 'Fechas no válidas',
        timer: 2000,
      });
    } else {
      this.price = this.roomGetData.price * totalDays;
    }
  }

  getRoomId(idRoom: string) {
    this.roomGetId = idRoom;
    this.roomRest.getRoomClient(this.hotelGetId, this.roomGetId).subscribe({
      next: (res: any) => {
        this.roomGetData = res.room;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  reserveRoom(reserveForm: any) {
    Swal.fire({
      text: '¿Estás seguro de realizar la reservación?',
      title: 'Revisa bien antes las fechas',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, quiero reservar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservationRest
          .reserveRoom(this.reserve, this.hotelGetId, this.roomGetId)
          .subscribe({
            next: (res: any) => {
              Swal.fire({
                icon: 'success',
                title: res.message,
              });
              this.getRoomsClient(this.hotelGetId);
              reserveForm.reset();
              this.router.navigateByUrl('/myReserve')
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
