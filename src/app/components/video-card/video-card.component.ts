import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Video } from '../../models/video.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css'],
})
export class VideoCardComponent {
  @Input() video!: Video;
}
