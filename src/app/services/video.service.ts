import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Video } from '../models/video.model';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = 'http://localhost:3000/videos';

  constructor(private http: HttpClient) { }

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.apiUrl);
  }

  getVideoById(id: number): Observable<Video> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Video>(url);
  }

  searchVideos(term: string): Observable<Video[]> {
    const url = `${this.apiUrl}?title_like=${encodeURIComponent(term)}&description_like=${encodeURIComponent(term)}`;
    console.log('URL de busca:', url);
    return this.http.get<Video[]>(url).pipe(
      tap((videos) => {
        console.log('Vídeos retornados do servidor:', videos);
      }),
      catchError((error) => {
        console.error('Erro na requisição de busca:', error);
        return of([]);
      })
    );
  }

  updateVideo(video: Video): Observable<Video> {
    return this.http.put<Video>(`${this.apiUrl}/${video.id}`, video);
  }

  getVideosByIds(ids: number[]): Observable<Video[]> {
    const params = ids.map(id => `id=${id}`).join('&');
    return this.http.get<Video[]>(`${this.apiUrl}?${params}`);
  }
}
