import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogImage } from '../models/BlogImage.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageSelectorService {
  http = inject(HttpClient);
  showImageSelector= signal<boolean>(false);
  selectedImage = signal<string | null>(null);

  showImageSelectorPanel() {
    this.showImageSelector.set(true);
  }

  hideImageSelectorPanel() {
    this.showImageSelector.set(false);
  }


  uploadImage(file: File, fileName: string, title: string): Observable<BlogImage> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);

    return this.http.post<BlogImage>(`${environment.apiBaseUrl}/api/Images`, formData);
  }
  
  getAllImages(id: WritableSignal<string | undefined>) : HttpResourceRef<BlogImage[] | undefined> {
    return httpResource<BlogImage[]>(() => {
      id();
      return `${environment.apiBaseUrl}/api/Images`;
    });
  }

  selectImage(imageUrl: string) { 
    this.selectedImage.set(imageUrl);
    this.hideImageSelectorPanel();
  }


}
