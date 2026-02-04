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
        private readonly ICategoryRepository _categoryRepository;
        public BlogPostsController(IBlogPostRepository blogPostRepository, ICategoryRepository categoryRepository)
        {
            _blogPostRepository = blogPostRepository;
            _categoryRepository = categoryRepository;
        }

        //post: api/blogposts
        [HttpPost]
        public async Task<IActionResult> CreateBlogPost([FromBody] CreateBlogPostRequestDto request)
        {
            //convert dto to domain
            var blogPost = new BlogPost
            {
                Title = request.Title,
                ShortDescription = request.ShortDescription,
                Content = request.Content,
                FeatureImageUrl = request.FeatureImageUrl,
                UrlHandle = request.UrlHandle,
                PublishedDate = request.PublishedDate,
                Author = request.Author,
                IsVisible = request.IsVisible,
                Categories = new List<Category>()
            };

            foreach (var categoryGuid in request.Categories)
            {
                var existingCategory = await _categoryRepository.GetById(categoryGuid);
                if (existingCategory != null)
                {
                    blogPost.Categories.Add(existingCategory);
                }
            }

            blogPost = await _blogPostRepository.CreateAsync(blogPost);

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
                IsVisible = blogPost.IsVisible,
                Categories = blogPost.Categories.Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    UrlHandle = c.UrlHandle
                }).ToList()
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
                    IsVisible = blogPost.IsVisible,
                    Categories = blogPost.Categories.Select(c => new CategoryDto
                    {
                        Id = c.Id,
                        Name = c.Name,
                        UrlHandle = c.UrlHandle
                    }).ToList()
                });
            }

            return Ok(response);
        }

        //get: api/blogposts/{id}
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetBlogPostById([FromRoute] Guid id)
        {
            //get blog post from repository
            var blogPost = await _blogPostRepository.GetById(id);
            if (blogPost is null)
            {
                return NotFound();
            }
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
                IsVisible = blogPost.IsVisible,
                Categories = blogPost.Categories.Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    UrlHandle = c.UrlHandle
                }).ToList()
            };

            return Ok(response);
        }

        //put: api/blogposts/{id}
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateBlogPostById([FromRoute] Guid id, UpdateBlogPostDto request)
        {
            //dto to domain
            var blogPost = new BlogPost
            {
                Id = id,
                Title = request.Title,
                ShortDescription = request.ShortDescription,
                Content = request.Content,
                FeatureImageUrl = request.FeatureImageUrl,
                UrlHandle = request.UrlHandle,
                PublishedDate = request.PublishedDate,
                Author = request.Author,
                IsVisible = request.IsVisible,
                Categories = new List<Category>()
            };

            //foreach category guid, get category from repository and add to blogpost categories
            foreach (var categoryGuid in request.Categories)
            {
                var existingCategory = await _categoryRepository.GetById(categoryGuid);
                if (existingCategory != null)
                {
                    blogPost.Categories.Add(existingCategory);
                }
            }

            //call repository to update blog post
            var updatedblogPost = await _blogPostRepository.UpdateAsync(blogPost);

            if (updatedblogPost is null)
            {
                return NotFound();
            }

            //domain to dto
            var response = new BlogPostDto
            {
                Id = updatedblogPost.Id,
                Title = updatedblogPost.Title,
                ShortDescription = updatedblogPost.ShortDescription,
                Content = updatedblogPost.Content,
                FeatureImageUrl = updatedblogPost.FeatureImageUrl,
                UrlHandle = updatedblogPost.UrlHandle,
                PublishedDate = updatedblogPost.PublishedDate,
                Author = updatedblogPost.Author,
                IsVisible = updatedblogPost.IsVisible,
                Categories = updatedblogPost.Categories.Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    UrlHandle = c.UrlHandle
                }).ToList()
            };

            return Ok(response);

        }

        //delete: api/blogposts/{id}
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteBlogPostById([FromRoute] Guid id)
        {
            var deletedblogPost = await _blogPostRepository.DeleteAsync(id);

            if (deletedblogPost is null)
            {
                return NotFound();
            }

            //domain to dto
            var response = new BlogPostDto
            {
                Id = deletedblogPost.Id,
                Title = deletedblogPost.Title,
                ShortDescription = deletedblogPost.ShortDescription,
                Content = deletedblogPost.Content,
                FeatureImageUrl = deletedblogPost.FeatureImageUrl,
                UrlHandle = deletedblogPost.UrlHandle,
                PublishedDate = deletedblogPost.PublishedDate,
                Author = deletedblogPost.Author,
                IsVisible = deletedblogPost.IsVisible,
            };

            return Ok(response);

        }
    }
}
