import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogpostService } from '../services/blogpost-service';
import { AddBlogPostRequest } from '../models/blogpost.model';
import { Router, RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category-service';

@Component({
  selector: 'app-add-blogpost',
  imports: [ReactiveFormsModule, MarkdownModule, RouterLink],
  templateUrl: './add-blogpost.html',
  styleUrl: './add-blogpost.css',
})
export class AddBlogpost {
  blogPostService = inject(BlogpostService);
  categoryService = inject(CategoryService);
  router = inject(Router);
  private categoriesResourceRef = this.categoryService.getAllCategories();
  categoriesResponse = this.categoriesResourceRef.value;

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
    publishedDate: new FormControl<string>(new Date().toISOString().split('T')[0], {
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
    categories: new FormControl<string[]>([]),

  }); 

  onSubmit() {
    const formRawValue = this.addblogpostForm.getRawValue();
    console.log(formRawValue);

    const requestDto: AddBlogPostRequest = {
      title: formRawValue.title,
      shortDescription: formRawValue.shortDescription,
      content: formRawValue.content,
      featureImageUrl: formRawValue.featureImageUrl,
      urlHandle: formRawValue.urlHandle,
      author: formRawValue.author,
      publishedDate: new Date(formRawValue.publishedDate),
      isVisible: formRawValue.isVisible,
      categories: formRawValue.categories ?? [],
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
