import { Component, inject, signal } from '@angular/core';
import { ImageSelectorService } from '../../services/image-selector-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogImage } from '../../models/BlogImage.model';

@Component({
  selector: 'app-image-select',
  imports: [ReactiveFormsModule],
  templateUrl: './image-select.html',
  styleUrl: './image-select.css',
})
export class ImageSelector {
  private imageselectorService = inject(ImageSelectorService);

  showImageSelector = this.imageselectorService.showImageSelector.asReadonly();

  
  id = signal<string | undefined>(undefined);

  imagesRef = this.imageselectorService.getAllImages(this.id);
  isLoading = this.imagesRef.isLoading;
  images = this.imagesRef.value;
  error = this.imagesRef.error;

  imageSelectorUploadForm = new FormGroup({
    file: new FormControl<File | null | undefined>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
  });


  hide() {
    this.imageselectorService.hideImageSelectorPanel();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    this.imageSelectorUploadForm.patchValue({
      file: file,
    });
  }

  onSelectImagae(img: BlogImage){
    this.imageselectorService.selectImage(img.url);
  }

  onSubmit() {
    if (this.imageSelectorUploadForm.valid) {
      // submit this form
      const formRawValue = this.imageSelectorUploadForm.getRawValue();

      this.imageselectorService
        .uploadImage(formRawValue.file!, formRawValue.name, formRawValue.title)
        .subscribe({
          next: (response) => {
            this.id.set(response.id);
            this.imageSelectorUploadForm.reset();
          },
          error: () => {
            console.error('Something went wrong!');
          },
        });
    }
  }
}
