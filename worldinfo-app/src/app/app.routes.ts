import { Routes } from '@angular/router';

import { CountriesComponent } from './countries/countries.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
  { path: 'countries', component: CountriesComponent },
  { path: 'countries/:code', component: CountriesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'map', component: MapComponent },
  { path: '', redirectTo: 'countries', pathMatch: 'full' },
];
