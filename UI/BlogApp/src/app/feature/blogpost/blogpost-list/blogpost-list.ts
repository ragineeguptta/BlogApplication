import { Component,inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogpostService } from '../services/blogpost-service';
import { CommonModule, DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-blogpost-list',
  imports: [RouterLink, CommonModule, NgClass, DatePipe],
  templateUrl: './blogpost-list.html',
  styleUrl: './blogpost-list.css',
})
export class BlogpostList {
  blogpostService = inject(BlogpostService);

  getAllBlogPostRef = this.blogpostService.getAllBlogPosts();

  isLoading = this.getAllBlogPostRef.isLoading;
  isError = this.getAllBlogPostRef.error;
  value = this.getAllBlogPostRef.value;
  statusCode = this.getAllBlogPostRef.statusCode;


}
