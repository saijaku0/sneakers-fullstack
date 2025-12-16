using System;
using System.Collections.Generic;
using System.Text;

namespace SneakersShop.Domain.Entities
{
    public class Brand
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastUpdatedAt { get; set; }
        public string? LastUpdatedBy { get; set; }

        public List<Sneaker> Sneakers { get; set; } = new();
    }
}
