import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { appRoutingProviders } from './app.routes';
import { VideoService } from './services/video.service';
import { FavoriteService } from './services/favorite.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    appRoutingProviders,
    VideoService,
    FavoriteService,
    // Outros provedores
  ],
};
