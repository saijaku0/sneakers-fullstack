namespace SneakersShop.Application.DTO
{
    public record SneakerDTO
    {
        public required int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public BrandDTO Brand { get; set; } = new BrandDTO();
    }
}
