using Microsoft.EntityFrameworkCore;
using SneakersShop.Domain.Entities;

namespace SneakersShop.Infrastructure
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; } = null!; 
        public DbSet<Brand> Brands { get; set; } = null!;
        public DbSet<Sneaker> Sneakers { get; set; } = null!;
        public DbSet<ProductStock> ProductStocks { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<OrderItem> OrderItems { get; set; } = null!;
        //public DbSet<RefreshToken> RefreshTokens { get; set; } = null!;
        public DbSet<ApiKey> ApiKeys { get; set; } = null!;
    }
}
