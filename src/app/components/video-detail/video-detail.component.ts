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

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.videoService.getVideoById(id).subscribe(video => {
      this.video = video;
      this.incrementViews();
    });
  }

  incrementViews(): void {
    this.video.views += 1;
    this.videoService.updateVideo(this.video).subscribe();
  }

  addToFavorites(): void {
    this.favoriteService.addFavorite(this.video.id).subscribe();
  }
}
