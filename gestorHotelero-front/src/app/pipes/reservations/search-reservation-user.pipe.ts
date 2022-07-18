import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchReservationUser',
})
export class SearchReservationUserPipe implements PipeTransform {
  transform(reservations: any, searchReservationUser: any) {
    if (searchReservationUser == undefined) {
      return reservations;
    } else {
      return reservations.filter((reservation: any) => {
        return reservation.user.username.toLowerCase().includes(searchReservationUser.toLowerCase());
      });
    }
  }
}
