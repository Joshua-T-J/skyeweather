import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/weather/weather').then((m) => m.Weather) },
];
