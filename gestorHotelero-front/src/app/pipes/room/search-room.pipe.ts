import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchRoom',
})
export class SearchRoomPipe implements PipeTransform {
  transform(rooms: any, searchRoom: any) {
    if (searchRoom == undefined) {
      return rooms;
    } else {
      return rooms.filter((room: any) => {
        return room.name.toLowerCase().includes(searchRoom.toLowerCase());
      });
    }
  }
}
