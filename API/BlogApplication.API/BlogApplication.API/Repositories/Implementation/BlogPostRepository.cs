using BlogApplication.API.Data;
using BlogApplication.API.Model.Domain;
using BlogApplication.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace BlogApplication.API.Repositories.Implementation
{
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly ApplicationDbContext _context;
        public BlogPostRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<BlogPost> CreateAsync(BlogPost blogPost)
        {
            await _context.BlogPosts.AddAsync(blogPost);
            await _context.SaveChangesAsync();
            return blogPost;
        }

        public async Task<BlogPost?> DeleteAsync(Guid id)
        {
           var existing =  await _context.BlogPosts.FirstOrDefaultAsync(x => x.Id == id);
            if (existing == null)
            {
                 return null;
            }
            _context.BlogPosts.Remove(existing);
            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<IEnumerable<BlogPost>> GetAllAsync()
        {
            return await _context.BlogPosts.Include(x => x.Categories).ToListAsync();
        }

        public async Task<BlogPost?> GetById(Guid id)
        {
            return await _context.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<BlogPost?> GetByUrlHandle(string urlHandle)
        {
            return await _context.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.UrlHandle == urlHandle);
        }

        public async Task<BlogPost> UpdateAsync(BlogPost blogPost)
        {
            var existingblogPost = await _context.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == blogPost.Id);

            if (existingblogPost == null)
            {
                return null;
            }
            
            _context.Entry(existingblogPost).CurrentValues.SetValues(blogPost);

            //update categories
            existingblogPost.Categories = blogPost.Categories;

            await _context.SaveChangesAsync();

            return blogPost;
        }
    }
}
