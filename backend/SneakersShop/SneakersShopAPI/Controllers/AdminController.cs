using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SneakersShop.Domain.Entities;
using SneakersShop.Infrastructure;

namespace SneakersShop.API.Controllers
{
    public class AdminController(ApplicationDbContext context) : Controller
    {
        private readonly ApplicationDbContext _context = context;

        [Authorize(Roles = "Admin")]
        [HttpPost("generate-api-key")]
        public async Task<IActionResult> GenerateApiKey(string clientName)
        {
            var key = "sk_live_" + Guid.NewGuid().ToString("N");

            var apiKeyEntity = new ApiKey
            {
                Key = key,
                OwnerName = clientName,
                IsActive = true
            };

            _context.ApiKeys.Add(apiKeyEntity);
            await _context.SaveChangesAsync();

            return Ok(new { ApiKey = key });
        }
    }
}
