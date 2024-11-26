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
  favoriteIds: number[] = [];

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
        this.favoriteIds = favorites.map(fav => fav.id); // Armazena os IDs dos favoritos
        this.getFavoriteVideos(favorites);
      },
      (error) => {
        console.error('Erro ao obter favoritos:', error);
      }
    );
  }

  removeFromFavorites(index: number): void {
    const favoriteId = this.favoriteIds[index];
    this.favoriteService.removeFavorite(favoriteId).subscribe(
      () => {
        console.log('Vídeo removido dos favoritos com sucesso.');
        // Remove o vídeo da lista localmente
        this.favoriteVideos.splice(index, 1);
        this.favoriteIds.splice(index, 1);
      },
      (error) => {
        console.error('Erro ao remover dos favoritos:', error);
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
