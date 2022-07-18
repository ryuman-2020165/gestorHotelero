import { Component, OnInit } from '@angular/core';

import { HotelRestService } from 'src/app/services/hotel/hotel-rest.service';

@Component({
  selector: 'app-view-hotels',
  templateUrl: './view-hotels.component.html',
  styleUrls: ['./view-hotels.component.css'],
})
export class ViewHotelsComponent implements OnInit {
  constructor(private hotelRest: HotelRestService) {}

  ngOnInit(): void {
    this.getHotelsUnregisteredUser();
  }

  searchHotel: String = '';

  hotels:any;

  getHotelsUnregisteredUser() {
    this.hotelRest.getHotelsUnregisteredUser().subscribe({
      next: (res: any) => {
        this.hotels = res.hotels;
      },
      error: (err: any) => {
        console.log(err.error.message);
      },
    });
  }
}
