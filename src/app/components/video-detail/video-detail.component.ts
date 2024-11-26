import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { FavoriteService } from '../../services/favorite.service';
import { Video } from '../../models/video.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-detail',
  standalone:true,
  imports: [CommonModule, RouterModule],
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  video!: Video;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')!);
  this.videoService.getVideoById(id).subscribe((video) => {
    if (video) {
      this.video = video;
      this.incrementViews();
      // Verificar se o vídeo é favorito
      this.checkIfFavorite();
    } else {
      console.error('Video not found');
    }
  });
  }

  incrementViews(): void {
    this.video.views += 1;
    this.videoService.updateVideo(this.video).subscribe();
  }

  addToFavorites(): void {
    this.favoriteService.isFavorite(this.video.id).subscribe(
      (isFav) => {
        if (isFav) {
          console.log('O vídeo já está nos favoritos.');
          alert('Este vídeo já está nos seus favoritos.');
        } else {
          this.favoriteService.addFavorite(this.video.id).subscribe(
            () => {
              console.log('Vídeo adicionado aos favoritos com sucesso.');
              alert('Vídeo adicionado aos favoritos.');
              this.isFavorite = true; // Atualiza o estado
            },
            (error) => {
              console.error('Erro ao adicionar aos favoritos:', error);
              alert('Erro ao adicionar o vídeo aos favoritos.');
            }
          );
        }
      },
      (error) => {
        console.error('Erro ao verificar se o vídeo é favorito:', error);
        alert('Erro ao verificar favoritos.');
      }
    );
  }

  checkIfFavorite(): void {
    this.favoriteService.isFavorite(this.video.id).subscribe(
      (isFav) => {
        this.isFavorite = isFav;
      },
      (error) => {
        console.error('Erro ao verificar se o vídeo é favorito:', error);
      }
    );
  }
}
