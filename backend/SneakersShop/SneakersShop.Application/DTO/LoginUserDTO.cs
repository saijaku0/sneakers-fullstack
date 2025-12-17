using System.ComponentModel.DataAnnotations;

namespace SneakersShop.Application.DTO
{
    public class LoginUserDTO
    {
        public record LoginUserDTORecord
        (
            [Required(ErrorMessage = "Email is required")]
            [EmailAddress(ErrorMessage = "Invalid email format")]
            string Email,
            [Required(ErrorMessage = "Password is required")]
            string Password
        );
    }
}

