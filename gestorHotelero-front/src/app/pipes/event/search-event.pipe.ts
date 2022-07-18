import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchEvent',
})
export class SearchEventPipe implements PipeTransform {
  transform(events: any, searchEvent: any) {
    if (searchEvent == undefined) {
      return events;
    } else {
      return events.filter((service: any) => {
        return service.name.toLowerCase().includes(searchEvent.toLowerCase());
      });
    }
  }
}
