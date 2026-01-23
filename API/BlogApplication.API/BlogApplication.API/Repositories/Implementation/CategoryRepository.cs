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

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public Task<Category?> GetById(Guid id)
        {
            return _context.Categories.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
