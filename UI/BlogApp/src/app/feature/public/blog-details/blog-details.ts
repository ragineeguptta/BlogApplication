import { Component, input } from '@angular/core';
import { BlogpostService } from '../../blogpost/services/blogpost-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-details',
  imports: [RouterLink],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.css',
})
export class BlogDetails {
  url = input<string | undefined>();
  blogpostService = new BlogpostService();

  //fetch blog details using the url parameter and display them in the template
  blogDetailsRef = this.blogpostService.getBlogPostByUrlHandle(this.url);
  isLoading = this.blogDetailsRef.isLoading;
  error = this.blogDetailsRef.error;
  blogDetails = this.blogDetailsRef.value;



}
