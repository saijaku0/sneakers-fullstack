using Microsoft.AspNetCore.Mvc;
using SneakersShop.Infrastructure;

namespace SneakersShop.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;
    }
}
