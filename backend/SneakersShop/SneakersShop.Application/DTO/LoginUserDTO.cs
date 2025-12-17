using System.ComponentModel.DataAnnotations;

namespace SneakersShop.Application.DTO
{
    public class LoginUserDTO
    {
        public record LoginUserDTORecord(string Email, string Password);
    }
}

