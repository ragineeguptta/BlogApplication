using BlogApplication.API.Model.Domain;

namespace BlogApplication.API.Repositories.Interface
{
    public interface IImageRepository
    {
        Task<IEnumerable<BlogImage>> GetAll();
        Task<BlogImage> Upload(IFormFile file, BlogImage blogImage);
    }
}
