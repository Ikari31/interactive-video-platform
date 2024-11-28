import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

import { LoginComponent } from './components/login/login.component';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: 'video/:id', 
    component: VideoDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

export const appRoutingProviders = [
  provideRouter(routes),
];

