import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./core/component/navbar/navbar";
import { ImageSelector } from "./shared/components/image-select/image-select";
import { AuthService } from './feature/auth/services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, ImageSelector],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('BlogApp');
  authService = inject(AuthService);

  loadUserRef = this.authService.loadUser();
  user = this.loadUserRef.value;

  effectRef = effect(() => {
    const userValue = this.user();

    if (userValue) {
      this.authService.setUser(userValue);
    }
  });

}
