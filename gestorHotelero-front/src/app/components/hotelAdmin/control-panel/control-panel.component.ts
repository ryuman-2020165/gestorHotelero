import { Component, OnInit } from '@angular/core';

import { HotelRestService } from 'src/app/services/hotel/hotel-rest.service';
import { RoomRestService } from 'src/app/services/room/room-rest.service';
import { ServiceRestService } from 'src/app/services/service/service-rest.service';
import { EventRestService } from 'src/app/services/event/event-rest.service';
import { ReservationRestService } from 'src/app/services/reservation/reservation-rest.service';
import { BillRestService } from 'src/app/services/bill/bill-rest.service';

import { HotelModel } from 'src/app/models/hotel.model';
import { RoomModel } from 'src/app/models/room.model';
import { ServiceModel } from 'src/app/models/service.model';
import { EventModel } from 'src/app/models/event.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
})
export class ControlPanelComponent implements OnInit {
  constructor(
    private hotelRest: HotelRestService,
    private roomRest: RoomRestService,
    private serviceRest: ServiceRestService,
    private eventRest: EventRestService,
    private reservationRest: ReservationRestService,
    private billRest: BillRestService
  ) {
    this.hotel = new HotelModel('', '', '', '', '');
    this.room = new RoomModel('', '', '', '', 0, false, '');
    this.service = new ServiceModel('', '', '', '', 0);
    this.event = new EventModel('', '', '', '', '', new Date());
  }

  ngOnInit(): void {
    this.getHotels();
    this.labelFilter = 'Habitaciones disponibles';
    this.labelFilterReservation = 'En curso';

    this.today = new Date().toISOString().split('T')[0];
  }

  today: any;

  //* Hoteles ---------------------------------------------------------------------------------------
  searchHotel: String = '';
  hotelGetId: any;
  filesToUpload: any;

  hotel: HotelModel;
  hotels: any;
  hotelGetData: any;

  addHotel(addHotelForm: any) {
    this.hotelRest.addHotel(this.hotel).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        this.getHotels();
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

  getHotels() {
    this.hotelRest.getHotels().subscribe({
      next: (res: any) => {
        this.hotels = res.hotels;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getHotel(id: string) {
    this.hotelRest.getHotel(id).subscribe({
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

  updateHotel() {
    this.hotelGetData.adminHotel = undefined;
    this.hotelGetData.image = undefined;

    this.hotelRest
      .updateHotel(this.hotelGetData, this.hotelGetData._id)
      .subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: res.message,
          });
          this.getHotels();
        },
        error: (err) => {
          Swal.fire({
            icon: 'warning',
            title: err.error.message || err.error,
          });
        },
      });
  }

  deleteHotel(id: string) {
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
        this.hotelRest.deleteHotel(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              icon: 'success',
              title: res.message,
            });
            this.getHotels();
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

  getIdHotel(idHotel: string) {
    this.hotelGetId = idHotel;
  }

  filesChange(inputFile: any) {
    this.filesToUpload = <Array<File>>inputFile.target.files;
    console.log(this.filesToUpload);
  }

  uploadImage() {
    this.hotelRest
      .requestFiles(this.hotelGetId, this.filesToUpload, 'image')
      .then((res: any) => {
        let resClear = JSON.parse(res);
        if (!resClear.error) {
          Swal.fire({
            icon: 'success',
            title: resClear.message,
          });
          this.getHotels();
        } else {
          Swal.fire({
            icon: 'success',
            title: res,
          });
        }
      });
  }

  //* Habitaciones ---------------------------------------------------------------------------------------
  labelFilter: any;
  searchRoom: String = '';

  room: RoomModel;
  rooms: any;
  roomGetData: any;

  toggleSearch() {
    if (this.labelFilter == 'Habitaciones disponibles') {
      this.getRoomsAvailable();
      this.labelFilter = 'Habitaciones no disponibles';
    } else if (this.labelFilter == 'Habitaciones no disponibles') {
      this.getRoomsNoAvailable();
      this.labelFilter = 'Todas las habitaciones';
    } else if (this.labelFilter == 'Todas las habitaciones') {
      this.getRooms(this.hotelGetId);
      this.labelFilter = 'Habitaciones disponibles';
    }
  }

  addRoom(addRoomForm: any) {
    this.room.hotel = this.hotelGetId;
    this.roomRest.addRoom(this.room).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        this.getRooms(this.hotelGetId);
        addRoomForm.reset();
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getRooms(idHotel: string) {
    this.hotelGetId = idHotel;
    this.labelFilter = 'Habitaciones disponibles';
    this.roomRest.getRooms(idHotel).subscribe({
      next: (res: any) => {
        this.rooms = res.rooms;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getRoomsAvailable() {
    this.roomRest.getRoomsAvailable(this.hotelGetId).subscribe({
      next: (res: any) => {
        this.rooms = res.rooms;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getRoomsNoAvailable() {
    this.roomRest.getRoomsNoAvailable(this.hotelGetId).subscribe({
      next: (res: any) => {
        this.rooms = res.rooms;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getRoom(idRoom: string) {
    this.roomRest.getRoom(this.hotelGetId, idRoom).subscribe({
      next: (res: any) => {
        this.roomGetData = res.checkRoomHotel;
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  updateRoom() {
    this.roomGetData.hotel = undefined;
    this.roomRest
      .updateRoom(this.roomGetData, this.hotelGetId, this.roomGetData._id)
      .subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: res.message,
          });
          this.getHotels();
          this.getRooms(this.hotelGetId);
        },
        error: (err) => {
          Swal.fire({
            icon: 'warning',
            title: err.error.message || err.error,
          });
        },
      });
  }

  deleteRoom(idRoom: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta habitación?',
      text: '¡Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, quiero eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.roomRest.deleteRoom(this.hotelGetId, idRoom).subscribe({
          next: (res: any) => {
            Swal.fire({
              icon: 'success',
              title: res.message,
            });
            this.getRooms(this.hotelGetId);
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

  //* Servicios ---------------------------------------------------------------------------------------
  searchService: String = '';

  service: ServiceModel;
  services: any;
  serviceGetData: any;

  addService(addServiceForm: any) {
    this.service.hotel = this.hotelGetId;
    this.serviceRest.addService(this.service).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        this.getServices(this.hotelGetId);
        addServiceForm.reset();
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getServices(idHotel: string) {
    this.hotelGetId = idHotel;
    this.serviceRest.getServices(idHotel).subscribe({
      next: (res: any) => {
        this.services = res.services;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getService(idService: string) {
    this.serviceRest.getService(this.hotelGetId, idService).subscribe({
      next: (res: any) => {
        this.serviceGetData = res.checkServiceHotel;
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  updateService() {
    this.serviceGetData.hotel = undefined;
    this.serviceRest
      .updateService(
        this.serviceGetData,
        this.hotelGetId,
        this.serviceGetData._id
      )
      .subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: res.message,
          });
          this.getHotels();
          this.getServices(this.hotelGetId);
        },
        error: (err) => {
          Swal.fire({
            icon: 'warning',
            title: err.error.message || err.error,
          });
        },
      });
  }

  deleteService(idService: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este servicio?',
      text: '¡Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, quiero eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceRest.deleteService(this.hotelGetId, idService).subscribe({
          next: (res: any) => {
            Swal.fire({
              icon: 'success',
              title: res.message,
            });
            this.getServices(this.hotelGetId);
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

  //* Eventos ---------------------------------------------------------------------------------------
  searchEvent: String = '';

  event: EventModel;
  events: any;
  eventGetData: any;

  addEvent(addEventForm: any) {
    this.event.hotel = this.hotelGetId;
    this.eventRest.addEvent(this.event).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        this.getEvents(this.hotelGetId);
        addEventForm.reset();
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  getEvents(idHotel: string) {
    this.hotelGetId = idHotel;
    this.eventRest.getEvents(idHotel).subscribe({
      next: (res: any) => {
        this.events = res.events;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getEvent(idEvent: string) {
    this.eventRest.getEvent(this.hotelGetId, idEvent).subscribe({
      next: (res: any) => {
        this.eventGetData = res.checkEventHotel;
        console.log(this.eventGetData);
      },
      error: (err) => {
        Swal.fire({
          icon: 'warning',
          title: err.error.message || err.error,
        });
      },
    });
  }

  updateEvent() {
    this.eventGetData.hotel = undefined;
    this.eventRest
      .updateEvent(this.eventGetData, this.hotelGetId, this.eventGetData._id)
      .subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: res.message,
          });
          this.getHotels();
          this.getEvents(this.hotelGetId);
        },
        error: (err) => {
          Swal.fire({
            icon: 'warning',
            title: err.error.message || err.error,
          });
        },
      });
  }

  deleteEvent(idEvent: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este evento?',
      text: '¡Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, quiero eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventRest.deleteEvent(this.hotelGetId, idEvent).subscribe({
          next: (res: any) => {
            Swal.fire({
              icon: 'success',
              title: res.message,
            });
            this.getEvents(this.hotelGetId);
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

  //* Reservaciones ---------------------------------------------------------------------------------------
  labelFilterReservation: any;
  searchReservation: String = '';

  reservations: any;
  reservationGetData: any;
  reservationGetId: any;

  servicesReservation: any;

  toggleSearchReservations() {
    if (this.labelFilterReservation == 'En curso') {
      this.getReservationsInProgress();
      this.labelFilterReservation = 'Facturadas';
    } else if (this.labelFilterReservation == 'Facturadas') {
      this.getReservationsBilled();
      this.labelFilterReservation = 'Canceladas';
    } else if (this.labelFilterReservation == 'Canceladas') {
      this.getReservationsCancelled();
      this.labelFilterReservation = 'Canceladas y facturadas';
    } else if (this.labelFilterReservation == 'Canceladas y facturadas') {
      this.getReservationsCancelledAndBilled();
      this.labelFilterReservation = 'Todas las reservaciones';
    } else if (this.labelFilterReservation == 'Todas las reservaciones') {
      this.getReservations(this.hotelGetId);
      this.labelFilterReservation = 'En curso';
    }
  }

  getReservations(idHotel: string) {
    this.hotelGetId = idHotel;
    this.labelFilterReservation = 'En curso';
    this.reservationRest.getReservations(idHotel).subscribe({
      next: (res: any) => {
        this.reservations = res.reservations;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getReservationsInProgress() {
    this.reservationRest.getReservationsInProgress(this.hotelGetId).subscribe({
      next: (res: any) => {
        this.reservations = res.reservations;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getReservationsBilled() {
    this.reservationRest.getReservationsBilled(this.hotelGetId).subscribe({
      next: (res: any) => {
        this.reservations = res.reservations;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getReservationsCancelled() {
    this.reservationRest.getReservationsCancelled(this.hotelGetId).subscribe({
      next: (res: any) => {
        this.reservations = res.reservations;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }

  getReservationsCancelledAndBilled() {
    this.reservationRest
      .getReservationsCancelledAndBilled(this.hotelGetId)
      .subscribe({
        next: (res: any) => {
          this.reservations = res.reservations;
        },
        error: (err: any) => {
          console.log(err.error.message);
        },
      });
  }

  getReservation(idReservation: string) {
    this.reservationGetId = idReservation;
    this.reservationRest
      .getReservation(this.hotelGetId, idReservation)
      .subscribe({
        next: (res: any) => {
          this.reservationGetData = res.checkReservationHotel;
          this.servicesReservation = res.services;
        },
        error: (err: any) => {
          console.log(err.error.message);
        },
      });
  }

  cancelReservation(idReservation: string) {
    Swal.fire({
      title: '¿Estás seguro de cancelar esta reservación?',
      text: '¡Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, quiero cancelarla',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservationRest
          .cancelReservation(this.hotelGetId, idReservation)
          .subscribe({
            next: (res: any) => {
              Swal.fire({
                icon: 'success',
                title: res.message,
              });
              this.getReservations(this.hotelGetId);
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

  checkInReservation(idReservation: string) {
    Swal.fire({
      title: '¿Estás seguro de facturar esta reservación?',
      text: '¡Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, quiero facturarla',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.billRest
          .checkInReservation(this.hotelGetId, idReservation)
          .subscribe({
            next: (res: any) => {
              Swal.fire({
                icon: 'success',
                title: res.message,
              });
              this.getReservations(this.hotelGetId);
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

  deleteServiceReservation(idServiceReservation: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este servicio de la reservación?',
      text: '¡Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, quiero eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservationRest
          .deleteServiceReservation(
            this.hotelGetId,
            this.reservationGetId,
            idServiceReservation
          )
          .subscribe({
            next: (res: any) => {
              Swal.fire({
                icon: 'success',
                title: res.message,
              });
              this.getReservations(this.hotelGetId);
              this.getReservation(this.reservationGetId);
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
