using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SneakersShop.Application.DTO;
using SneakersShop.Infrastructure;

namespace SneakersShop.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto registerUserDto)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == registerUserDto.Email);
            if (existingUser != null)
            {
                return BadRequest("User with this email already exists.");
            }

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(registerUserDto.Password);

            var newUser = new Domain.Entities.User
            {
                Id = Guid.NewGuid(),
                FirstName = registerUserDto.FirstName,
                LastName = registerUserDto.LastName,
                Email = registerUserDto.Email,
                PasswordHash = passwordHash,
                Role = "User",
                CreatedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDTO.LoginUserDTORecord loginUserDtoRecord)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == loginUserDtoRecord.Email);
            if (user == null)
            {
                return Unauthorized("Invalid email.");
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(loginUserDtoRecord.Password, user.PasswordHash);

            if (!isPasswordValid)
            {
                return Unauthorized("Invalid password.");
            }

            return Ok("Login successful.");
        }
    }
}
