import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { CarreraComponent } from './pages/carrera/carrera.component';
import { AplicantComponent } from './pages/aplicant/aplicant.component';
import { AdviserComponent } from './pages/adviser/adviser.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'carrera', component: CarreraComponent },
    { path: 'aplicant', component: AplicantComponent},
    { path: 'adviser', component: AdviserComponent }
];
