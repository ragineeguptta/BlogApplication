import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { loginResponse, User } from '../models/auth.modal';
import { HttpClient, httpResource, HttpResourceRef, HttpResourceRequest } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  apiBaseUrl = environment.apiBaseUrl;
  user = signal<User | null>(null);
  router = inject(Router)

  loadUser(): HttpResourceRef<User | undefined> {
    return httpResource<User>(() => {
      const request: HttpResourceRequest = {
        url: `${this.apiBaseUrl}/api/Auth/me`,
        withCredentials: true
      }
      return request;
    });
  }



  login(email: string, password: string): Observable<loginResponse> {
    return this.http
      .post<loginResponse>(
        `${environment.apiBaseUrl}/api/Auth/Login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .pipe(tap((userResponse) => this.setUser(userResponse)));
  }

  logout() {
    // API AUth/Logout

    this.http
      .post<void>(
        `${environment.apiBaseUrl}/api/Auth/Logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .subscribe({
        next: () => {
          // Clear out the user signal
          this.setUser(null);

          // redirect the user to home page
          this.router.navigate(['']);
        },
      });
  }


  setUser(updatedUser: User | null) {
    if (updatedUser) {
      this.user.set({
        email: updatedUser.email,
        roles: updatedUser.roles.map((r) => r.toLowerCase()),
      });
    } else {
      this.user.set(null);
    }
  }



}