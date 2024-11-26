import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video.model';
import { VideoCardComponent } from '../video-card/video-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [VideoCardComponent, SearchBarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];

  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos(): void {
    this.videoService.getVideos().subscribe(videos => this.videos = videos);
  }

  onSearch(term: string): void {
    if (term) {
      this.videoService.searchVideos(term).subscribe(videos => this.videos = videos);
    } else {
      this.getVideos();
    }
  }
}
