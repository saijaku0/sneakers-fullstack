using System.ComponentModel.DataAnnotations;

namespace SneakersShop.Application.DTO
{
    public record RegisterUserDto
    {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(50)]
        public string FirstName { get; init; } = string.Empty;
        [Required(ErrorMessage = "Last Name is required")]
        [StringLength(50)]
        public string LastName { get; init; } = string.Empty;
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; init; } = string.Empty;
        [Required]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters long")]
        [StringLength(100)]
        public string Password { get; init; } = string.Empty;
    }
}
