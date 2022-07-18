import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUser',
})
export class SearchUserPipe implements PipeTransform {
  transform(users: any, searchUser: any) {
    if (searchUser == undefined) {
      return users;
    } else {
      return users.filter((user: any) => {
        return user.username.toLowerCase().includes(searchUser.toLowerCase());
      });
    }
  }
}
