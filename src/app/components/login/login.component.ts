import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((loggedIn) => {
      if (loggedIn) {
        this.router.navigate(['/home']);
      }
    });
  }
  
  login(): void {
    this.auth.loginWithRedirect();
  }
}
