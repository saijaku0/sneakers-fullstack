using System;
using System.Collections.Generic;
using System.Text;

namespace SneakersShop.Application.DTO
{
    public class LoginUserDTO
    {
        public record LoginUserDTORecord(string Email, string Password);
    }
}
