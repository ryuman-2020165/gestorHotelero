import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './components/admin/hotels/hotels.component';

import { UsersComponent } from './components/admin/users/users.component';
import { MyReserveComponent } from './components/client/my-reserve/my-reserve.component';
import { ViewHotelsClientComponent } from './components/client/view-hotels-client/view-hotels-client.component';
import { HomeComponent } from './components/home/home.component';
import { ControlPanelComponent } from './components/hotelAdmin/control-panel/control-panel.component';
import { LoginComponent } from './components/login/login.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { ViewHotelsComponent } from './components/unregisteredUsers/view-hotels/view-hotels.component';

import { AdminGuard } from './guards/admin.guard';
import { HotelAdminGuard } from './guards/hotel-admin.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'myProfile', component: MyProfileComponent },
  { path: 'no-register/viewHotels', component: ViewHotelsComponent },
  {
    path: 'viewHotels',
    canActivate: [UserGuard],
    component: ViewHotelsClientComponent,
  },
  {
    path: 'myReserve',
    canActivate: [UserGuard],
    component: MyReserveComponent,
  },
  {
    path: 'controlPanelHotels',
    canActivate: [HotelAdminGuard],
    component: ControlPanelComponent,
  },
  {
    path: 'admin/users',
    canActivate: [AdminGuard],
    component: UsersComponent,
  },
  {
    path: 'admin/hotels',
    canActivate: [AdminGuard],
    component: HotelsComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
