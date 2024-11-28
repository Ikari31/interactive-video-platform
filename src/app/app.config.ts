import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { appRoutingProviders, routes } from './app.routes';
import { VideoService } from './services/video.service';
import { FavoriteService } from './services/favorite.service';
import { environment } from '../environments/environments';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),
    provideAuth0({
      domain: environment.auth.domain,
      clientId: environment.auth.clientId,
      authorizationParams: {
        redirect_uri: environment.auth.redirectUri,
      },
    }),
    appRoutingProviders,
    VideoService,
    FavoriteService,
  ],
};
