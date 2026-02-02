using BlogApplication.API.DTO;
using BlogApplication.API.Model.Domain;
using BlogApplication.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogApplication.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private readonly IBlogPostRepository _blogPostRepository;
        public BlogPostsController(IBlogPostRepository blogPostRepository)
        {
            _blogPostRepository = blogPostRepository;
        }

        //post: api/blogposts
        [HttpPost]
        public async Task<IActionResult> CreateBlogPost([FromBody] CreateBlogPostRequestDto blogPostRequestDto)
        {
            //convert dto to domain
            var blogPost = new BlogPost
            {
                Title = blogPostRequestDto.Title,
                ShortDescription = blogPostRequestDto.ShortDescription,
                Content = blogPostRequestDto.Content,
                FeatureImageUrl = blogPostRequestDto.FeatureImageUrl,
                UrlHandle = blogPostRequestDto.UrlHandle,
                PublishedDate = blogPostRequestDto.PublishedDate,
                Author = blogPostRequestDto.Author,
                IsVisible = blogPostRequestDto.IsVisible
            };

            await _blogPostRepository.CreateAsync(blogPost);

            //convert domain to dto
            var response = new BlogPostDto
            {
                Id = blogPost.Id,
                Title = blogPost.Title,
                ShortDescription = blogPost.ShortDescription,
                Content = blogPost.Content,
                FeatureImageUrl = blogPost.FeatureImageUrl,
                UrlHandle = blogPost.UrlHandle,
                PublishedDate = blogPost.PublishedDate,
                Author = blogPost.Author,
                IsVisible = blogPost.IsVisible
            };

            return Ok(response);

        }

        //get: api/blogposts
        [HttpGet]
        public async Task<IActionResult> GetAllBlogPosts()
        {
            var blogposts = await _blogPostRepository.GetAllAsync();

            //convert domain to dto
            var response = new List<BlogPostDto>();

            foreach (var blogPost in blogposts)
            {
                response.Add(new BlogPostDto
                {
                    Id = blogPost.Id,
                    Title = blogPost.Title,
                    ShortDescription = blogPost.ShortDescription,
                    Content = blogPost.Content,
                    FeatureImageUrl = blogPost.FeatureImageUrl,
                    UrlHandle = blogPost.UrlHandle,
                    PublishedDate = blogPost.PublishedDate,
                    Author = blogPost.Author,
                    IsVisible = blogPost.IsVisible
                });
            }

            return Ok(response);
        }
    }
}
