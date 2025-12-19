import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AddCategoryRequest, category } from '../model/category.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;

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

getAllCategories() {
 return httpResource<category[]>(() => `${this.apiBaseUrl}/api/Categories`);
}

}
