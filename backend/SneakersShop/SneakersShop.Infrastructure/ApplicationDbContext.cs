using Microsoft.EntityFrameworkCore;
using SneakersShop.Domain.Entities;

namespace SneakersShop.Infrastructure
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; } = null!; 
    }
}
