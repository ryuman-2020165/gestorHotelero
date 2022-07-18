import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/admin/users/users.component';
import { HotelsComponent } from './components/admin/hotels/hotels.component';
import { ControlPanelComponent } from './components/hotelAdmin/control-panel/control-panel.component';
import { SearchHotelPipe } from './pipes/hotel/search-hotel.pipe';
import { SearchRoomPipe } from './pipes/room/search-room.pipe';
import { SearchServicePipe } from './pipes/service/search-service.pipe';
import { SearchEventPipe } from './pipes/event/search-event.pipe';
import { SearchUserPipe } from './pipes/user/search-user.pipe';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ViewHotelsComponent } from './components/unregisteredUsers/view-hotels/view-hotels.component';
import { ViewHotelsClientComponent } from './components/client/view-hotels-client/view-hotels-client.component';
import { MyReserveComponent } from './components/client/my-reserve/my-reserve.component';
import { SearchRoomUserPipe } from './pipes/room/search-room-user.pipe';
import { SearchReservationUserPipe } from './pipes/reservations/search-reservation-user.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NotFoundComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    HotelsComponent,
    ControlPanelComponent,
    SearchHotelPipe,
    SearchRoomPipe,
    SearchServicePipe,
    SearchEventPipe,
    SearchUserPipe,
    MyProfileComponent,
    ViewHotelsComponent,
    ViewHotelsClientComponent,
    MyReserveComponent,
    SearchRoomUserPipe,
    SearchReservationUserPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
