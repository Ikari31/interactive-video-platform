// favorite.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private apiUrl = 'http://localhost:3000/favorites';

  constructor(private http: HttpClient) {}

  addFavorite(videoId: number): Observable<any> {
    return this.http.post(this.apiUrl, { videoId });
  }

  removeFavorite(favoriteId: number): Observable<any> {
    const url = `${this.apiUrl}/${favoriteId}`;
    return this.http.delete(url);
  }

  getFavorites(): Observable<{ id: number; videoId: number }[]> {
    return this.http.get<{ id: number; videoId: number }[]>(this.apiUrl);
  }

  isFavorite(videoId: number): Observable<boolean> {
    return this.http.get<{ id: number; videoId: number }[]>(`${this.apiUrl}?videoId=${videoId}`).pipe(
      map(favorites => favorites.length > 0),
      catchError(error => {
        console.error('Erro ao verificar se o vídeo é favorito:', error);
        return of(false);
      })
    );
  }
}
