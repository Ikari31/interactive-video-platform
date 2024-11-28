import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CommonModule, AsyncPipe, NgIf } from '@angular/common';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private searchService: SearchService,
    public auth: AuthService
  ) {}

  onSearch(term: string): void {
    //console.log('Termo recebido no HeaderComponent:', term);
    this.searchService.emitSearch(term);
  }

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}
