using BlogApplication.API.Data;
using BlogApplication.API.Model.Domain;
using BlogApplication.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace BlogApplication.API.Repositories.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;
        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Category> CreateAsync(Category category)
        {

            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();

            return category;
        }
    }
}
