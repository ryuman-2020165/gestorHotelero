import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchRoomUser'
})
export class SearchRoomUserPipe implements PipeTransform {
  transform(rooms: any, searchRoomUser: any) {
    if (searchRoomUser == undefined) {
      return rooms;
    } else {
      return rooms.filter((room: any) => {
        return room.currentUser.username.toLowerCase().includes(searchRoomUser.toLowerCase());
      });
    }
  }
}
