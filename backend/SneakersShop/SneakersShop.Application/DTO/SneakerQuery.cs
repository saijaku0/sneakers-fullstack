using System;
using System.Collections.Generic;
using System.Text;

namespace SneakersShop.Application.DTO
{
    public record SneakerQuery
    {
        public string? SearchTerm { get; init; }
        public int? BrandId { get; init; }
        public int Page { get; init; } = 1;
        public int PageSize { get; init; } = 10;
    }
}
