import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'video/:id', component: VideoDetailComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '**', redirectTo: '' },
];

export const appRoutingProviders = [
  provideRouter(routes),
];

