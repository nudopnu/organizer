import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DeviceListComponent } from './devices/device-list.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "devices", component: DeviceListComponent },
];
