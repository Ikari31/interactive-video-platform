import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = 'http://localhost:3000/favorites';

  constructor(private http: HttpClient) { }

  addFavorite(videoId: number): Observable<any> {
    return this.http.post(this.apiUrl, { videoId });
  }

  getFavorites(): Observable<{ id: number; videoId: number }[]> {
    return this.http.get<{ id: number; videoId: number }[]>(this.apiUrl);
  }
}
