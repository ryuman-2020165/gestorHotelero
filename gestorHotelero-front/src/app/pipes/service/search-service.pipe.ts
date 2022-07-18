import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchService',
})
export class SearchServicePipe implements PipeTransform {
  transform(services: any, searchService: any) {
    if (searchService == undefined) {
      return services;
    } else {
      return services.filter((service: any) => {
        return service.name.toLowerCase().includes(searchService.toLowerCase());
      });
    }
  }
}
