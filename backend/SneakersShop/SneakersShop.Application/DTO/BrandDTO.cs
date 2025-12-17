using System;
using System.Collections.Generic;
using System.Text;

namespace SneakersShop.Application.DTO
{
    public record BrandDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
