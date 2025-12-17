using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SneakersShop.Application.DTO;
using SneakersShop.Infrastructure;

namespace SneakersShop.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BrandsController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BrandDTO>>> GetBrands()
        {
            var brands = await _context.Brands
                .Select(b => new BrandDTO
                {
                    Id = b.Id,
                    Name = b.Name
                })
                .ToListAsync();

            return Ok(brands);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BrandDTO>> GetBrand(int id)
        {
            var brand = await _context.Brands
                .Where(b => b.Id == id)
                .Select(b => new BrandDTO
                {
                    Id = b.Id,
                    Name = b.Name
                })
                .FirstOrDefaultAsync();
            if (brand == null)
            {
                return NotFound();
            }
            return Ok(brand);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<CreateBrandDTO>> CreateBrand([FromBody] CreateBrandDTO createBrandDto)
        {
            var brand = new Domain.Entities.Brand
            {
                Name = createBrandDto.Name,
                CreatedAt = DateTime.UtcNow
            };

            _context.Brands.Add(brand);
            await _context.SaveChangesAsync();

            var resultDto = new BrandDTO
            {
                Id = brand.Id,
                Name = brand.Name
            };
            return CreatedAtAction(nameof(GetBrand), new { id = brand.Id }, resultDto);
        }
    }
}
