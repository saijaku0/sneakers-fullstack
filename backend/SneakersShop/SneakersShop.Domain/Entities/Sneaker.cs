using System;
using System.Collections.Generic;
using System.Text;

namespace SneakersShop.Domain.Entities
{
    public class Sneaker
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public int BrandId { get; set; }
        public Brand? Brand { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string ImagePath { get; set; } = string.Empty;
        public string? LastUpdatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastUpdatedAt { get; set; }
    }
}
