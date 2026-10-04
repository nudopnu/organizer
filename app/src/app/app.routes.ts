import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DeviceListComponent } from './devices/device-list.component';
import { ServiceListComponent } from './services/service-list.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "devices", component: DeviceListComponent },
    { path: "services", component: ServiceListComponent },
];
