using BlogApplication.API.Model.Domain;

namespace BlogApplication.API.Repositories.Interface
{
    public interface IBlogPostRepository
    {
        Task<BlogPost> CreateAsync(BlogPost blogPost);
        Task<IEnumerable<BlogPost>> GetAllAsync();
        Task<BlogPost?> GetById(Guid id);
        Task<BlogPost> UpdateAsync(BlogPost blogPost);
    }
}
