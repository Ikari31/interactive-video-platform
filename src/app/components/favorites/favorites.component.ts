import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video.model';
import { VideoCardComponent } from '../video-card/video-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [VideoCardComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  videos: Video[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private videoService: VideoService
  ) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteService.getFavorites().subscribe(favorites => {
      const videoIds = favorites.map(fav => fav.videoId);
      this.videoService.getVideosByIds(videoIds).subscribe(videos => {
        this.videos = videos;
      });
    });
  }
}
