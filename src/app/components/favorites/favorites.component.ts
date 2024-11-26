import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { FavoriteService } from '../../services/favorite.service';
import { Video } from '../../models/video.model';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { VideoCardComponent } from '../video-card/video-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, VideoCardComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favoriteVideos: Video[] = [];

  constructor(
    private videoService: VideoService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteService.getFavorites().subscribe(
      (favorites) => {
        console.log('Favoritos obtidos:', favorites);
        this.getFavoriteVideos(favorites);
      },
      (error) => {
        console.error('Erro ao obter favoritos:', error);
      }
    );
  }

  getFavoriteVideos(favorites: { id: number; videoId: number }[]): void {
    if (favorites.length === 0) {
      this.favoriteVideos = [];
      return;
    }

    const requests = favorites.map((fav) =>
      this.videoService.getVideoById(fav.videoId)
    );

    forkJoin(requests).subscribe(
      (videos) => {
        this.favoriteVideos = videos;
        console.log('Vídeos favoritos:', this.favoriteVideos);
      },
      (error) => {
        console.error('Erro ao obter vídeos favoritos:', error);
      }
    );
  }
}
