import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public redirectToLogin(): void {
    this.authService.redirectToLogin();
  }

  public redirectToRegister(): void {
    this.router.navigate(['/register']);
  }
}
