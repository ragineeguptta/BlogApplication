import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogpostService } from '../services/blogpost-service';
import { AddBlogPostRequest } from '../models/blogpost.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blogpost',
  imports: [ReactiveFormsModule],
  templateUrl: './add-blogpost.html',
  styleUrl: './add-blogpost.css',
})
export class AddBlogpost {
  blogPostService = inject(BlogpostService);
  router = inject(Router);



  addblogpostForm = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    }),
    shortDescription: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(300)],
    }),
    content: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
    featureImageUrl: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(1), Validators.maxLength(200)],
    }),
    urlHandle: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(1), Validators.maxLength(200)],
    }),
    publishedDate: new FormControl<Date>(new Date(), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    author: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(1), Validators.maxLength(100)],
    }),
    isVisible: new FormControl<boolean>(true, {
      nonNullable: true,
    }),

  }); 


  onSubmit() {
    const formRawValue = this.addblogpostForm.getRawValue();

    const requestDto: AddBlogPostRequest = {
      title: formRawValue.title,
      shortDescription: formRawValue.shortDescription,
      content: formRawValue.content,
      featureImageUrl: formRawValue.featureImageUrl,
      urlHandle: formRawValue.urlHandle,
      author: formRawValue.author,
      publishedDate: formRawValue.publishedDate,
      isVisible: formRawValue.isVisible,
    };
    
    this.blogPostService.createBlogPost(requestDto).subscribe({
      next: (response) => {
        this.router.navigate(['/admin/blogposts']);
      },
      error: (error) => {
        console.error('Error creating blog post:', error);
      },
    });
  }

}
