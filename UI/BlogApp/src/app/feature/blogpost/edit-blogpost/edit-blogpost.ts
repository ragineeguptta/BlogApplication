import { Component, effect, inject, input } from '@angular/core';
import { BlogpostService } from '../services/blogpost-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { RouterLink, Router } from '@angular/router';
import { CategoryService } from '../../category/services/category-service';
import { UpdateBlogPostRequest } from '../models/blogpost.model';

@Component({
  selector: 'app-add-blogpost',
  imports: [ReactiveFormsModule, MarkdownModule, RouterLink],
  templateUrl: './edit-blogpost.html',
  styleUrl: './edit-blogpost.css',
})
export class EditBlogpost {
  id = input<string>();
  blogPostService = inject(BlogpostService);
  categoruService = inject(CategoryService);
  router = inject(Router);

  private blogPostsRef = this.blogPostService.getBlogPostById(this.id);
  blogPostResponse = this.blogPostsRef.value;

  private categoriesResourceRef = this.categoruService.getAllCategories();
  categoriesResponse = this.categoriesResourceRef.value;

  editblogpostForm = new FormGroup({
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

  effectRef = effect(() => {
    if (this.blogPostResponse()) {
      this.editblogpostForm.patchValue({
        title: this.blogPostResponse()?.title ?? '',
        shortDescription: this.blogPostResponse()?.shortDescription ?? '',
        content: this.blogPostResponse()?.content ?? '',
        featureImageUrl: this.blogPostResponse()?.featureImageUrl ?? '',
        urlHandle: this.blogPostResponse()?.urlHandle ?? '',
        publishedDate: this.blogPostResponse()?.publishedDate.toString().split('T')[0],
        isVisible: this.blogPostResponse()?.isVisible ?? true,
        author: this.blogPostResponse()?.author ?? '',
        categories: this.blogPostResponse()?.categories.map(category => category.id) ?? [],
      })
    }
  });

  onSubmit() {
    const id = this.id();
    if (id && this.editblogpostForm.valid) {
    const formValue = this.editblogpostForm.getRawValue();

    const updateBlogPostRequestDto: UpdateBlogPostRequest = {
      title: formValue.title,
      shortDescription: formValue.shortDescription,
      content: formValue.content,
      featureImageUrl: formValue.featureImageUrl,
      urlHandle: formValue.urlHandle,
      author: formValue.author,
      publishedDate: new Date(formValue.publishedDate),
      isVisible: formValue.isVisible,
      categories: formValue.categories ?? []
    };

    this.blogPostService.editBlogPost(id, updateBlogPostRequestDto).subscribe({
      next: (response) => {
        this.router.navigate(['/admin/blogposts']);
      },
      error: (error) => {
        console.error('Error updating blog post:', error);
      }
    });
    }
  }
}
