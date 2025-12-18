import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AddCategoryRequest } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiBaseUrl = 'https://localhost:7257';

  addCategoryStatus = signal<`idle` | `loading` | `error` | `success`>(`idle`);

  addCategory(category: AddCategoryRequest){
    this.addCategoryStatus.set(`loading`);
    this.http.post<void>(`${this.apiBaseUrl}/api/Categories`, category)
    .subscribe({
      next: () => {
        this.addCategoryStatus.set(`success`);
      },
      error: () => {
        this.addCategoryStatus.set(`error`);
      },
    })
  }
}
