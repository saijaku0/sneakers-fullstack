using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SneakersShop.Application.DTO;
using SneakersShop.Infrastructure;
using SneakersShop.Domain.Entities;
using Microsoft.AspNetCore.Authorization;

namespace SneakersShop.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(ApplicationDbContext context, IConfiguration configuration) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;
        private readonly IConfiguration _configuration = configuration;

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

            var newUser = new User
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

            var token = GenerateJwtToken(user);

            return Ok(new { Token = token });
        }

        private string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]);

            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(6),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        [HttpGet("me")]
        [Authorize]
        public IActionResult GetCurrentUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized();
            }

            var user = _context.Users.Find(Guid.Parse(userId));
            if (user == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                user.FirstName,
                user.LastName,
                user.Email,
                user.Role,
                user.Id
            });
        }
    }
}
