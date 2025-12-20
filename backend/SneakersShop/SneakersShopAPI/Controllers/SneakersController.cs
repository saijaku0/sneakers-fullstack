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
                    },
                    ProductStocks = s.ProductStocks.Select(ps => new ProductStockDTO.ProductStockDTORecord
                    {
                        Id = ps.Id,
                        Size = ps.Size,
                        Quantity = ps.Quantity
                    }).ToList()
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
                    },
                    ProductStocks = s.ProductStocks.Select(ps => new ProductStockDTO.ProductStockDTORecord
                    {
                        Id = ps.Id,
                        Size = ps.Size,
                        Quantity = ps.Quantity
                    }).ToList()
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

        [Authorize(Roles = "Admin")]
        [HttpPost("{sneakerId}/stock")]
        public async Task<ActionResult> AddProductStock(int sneakerId, CreateProductStockDTO.CreateProductStockDTORecord stockDto)
        {
            var sneaker = await _context.Sneakers.FindAsync(sneakerId);
            if (sneaker == null)
            {
                return NotFound("Sneaker not found");
            }
            var productStock = new ProductStock
            {
                Size = stockDto.Size,
                Quantity = stockDto.Quantity,
                Sneaker = sneaker,
                SneakerId = sneakerId
            };
            _context.ProductStocks.Add(productStock);
            await _context.SaveChangesAsync();
            var resultDto = new ProductStockDTO.ProductStockDTORecord
            {
                Id = productStock.Id,
                Size = productStock.Size,
                Quantity = productStock.Quantity
            };
            return CreatedAtAction(nameof(GetSneaker), new { id = sneakerId }, resultDto);
        }

        [HttpGet]
        public async Task<ActionResult<PagedResult<SneakerDTO>>> GetSneakers([FromQuery] SneakerQuery query)
        {
            var sneakersQuery = _context.Sneakers.AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.SearchTerm))
            {
                sneakersQuery = sneakersQuery.Where(s => s.Title.ToLower().Contains(query.SearchTerm.ToLower()));
            }

            if (query.BrandId.HasValue)
            {
                sneakersQuery = sneakersQuery.Where(s => s.BrandId == query.BrandId.Value);
            }

            var totalCount = await sneakersQuery.CountAsync();

            var items = await sneakersQuery
                .Skip((query.Page - 1) * query.PageSize)
                .Take(query.PageSize)
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
                    },
                    ProductStocks = s.ProductStocks.Select(ps => new ProductStockDTO.ProductStockDTORecord
                    {
                        Id = ps.Id,
                        Size = ps.Size,
                        Quantity = ps.Quantity
                    }).ToList()
                })
                .ToListAsync();

            var result = new PagedResult<SneakerDTO>
            {
                Items = items,
                TotalCount = totalCount,
                PageNumber = query.Page,
                PageSize = query.PageSize
            };

            return Ok(result);
        }
    }
}
