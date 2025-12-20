using System.ComponentModel.DataAnnotations;

namespace SneakersShop.Application.DTO
{
    public record CreateOrderDTO
    {
        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public string Address { get; set; } = string.Empty;
        public List<CreateOrderItemDTO> Items { get; init; } = new();
    }

    public record CreateOrderItemDTO
    {
        [Required]
        public int SneakerId { get; set; }
        [Required]
        public int Size { get; set; }
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]
        public int Quantity { get; set; } = 0;
    }
}
