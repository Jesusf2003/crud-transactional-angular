import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { CarreraComponent } from './pages/carrera/carrera.component';
import { AdviserComponent } from './pages/adviser/adviser.component';
import { ApplicantComponent } from './pages/applicant/applicant.component';
import { ConsultationComponent } from './pages/consultation/consultation.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'carrera', component: CarreraComponent },
    { path: 'applicant', component: ApplicantComponent},
    { path: 'adviser', component: AdviserComponent },
    { path: 'consultation', component: ConsultationComponent }
];
