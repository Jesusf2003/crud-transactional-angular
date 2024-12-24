import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { CarreraComponent } from './pages/carrera/carrera.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'carrera', component: CarreraComponent }
];
