import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from '../models/video.model';

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
    return this.http.get<Video[]>(`${this.apiUrl}?q=${term}`);
  }

  updateVideo(video: Video): Observable<Video> {
    return this.http.put<Video>(`${this.apiUrl}/${video.id}`, video);
  }

  getVideosByIds(ids: number[]): Observable<Video[]> {
    const params = ids.map(id => `id=${id}`).join('&');
    return this.http.get<Video[]>(`${this.apiUrl}?${params}`);
  }
}
