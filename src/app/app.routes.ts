import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { AdminGuard } from './services/guards/admin.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';



const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    
    {
        path: '',
        component: PagesComponent,
        canActivate: [AdminGuard],
        loadChildren: './pages/pages.module#PagesModule'
    },
    { path: '**', component: NopagefoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
