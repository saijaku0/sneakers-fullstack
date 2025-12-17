using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SneakersShop.Application.DTO;
using SneakersShop.Infrastructure;
using SneakersShop.Domain.Entities;

namespace SneakersShop.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SneakersController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SneakerDTO>>> GetSneakers()
        {
            var sneakers = await _context.Sneakers
                .Select(s => new SneakerDTO
                {
                    Id = s.Id,
                    Title = s.Title,
                    Description = s.Description,
                    Price = s.Price,
                    ImageUrl = s.ImageUrl,
                    Brand = new BrandDTO
                    {
                        Id = s.Brand.Id,
                        Name = s.Brand.Name
                    }
                })
                .ToListAsync();

            return Ok(sneakers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SneakerDTO>> GetSneaker(int id)
        {
            var sneaker = await _context.Sneakers
                .Where(s => s.Id == id)
                .Select(s => new SneakerDTO
                {
                    Id = s.Id,
                    Title = s.Title,
                    Description = s.Description,
                    Price = s.Price,
                    ImageUrl = s.ImageUrl,
                    Brand = new BrandDTO
                    {
                        Id = s.Brand.Id,
                        Name = s.Brand.Name
                    }
                })
                .FirstOrDefaultAsync();

            if (sneaker == null)
            {
                return NotFound();
            }

            return Ok(sneaker);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult> CreateSneaker(CreateSneakerDTO sneakerDto)
        {
            var sneaker = new Sneaker
            {
                Title = sneakerDto.Title,
                Description = sneakerDto.Description,
                Price = sneakerDto.Price,
                ImageUrl = sneakerDto.ImageUrl,
                BrandId = sneakerDto.BrandId,
            };
            _context.Sneakers.Add(sneaker);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSneaker), new { id = sneaker.Id }, new { id = sneaker.Id });
        }
    }
}
