using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SneakersShop.Application.DTO;
using SneakersShop.Application.Interfaces;
using SneakersShop.Domain.Enums;
using SneakersShop.Infrastructure;
using System.Security.Claims;

namespace SneakersShop.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController(ApplicationDbContext context, IOrderService orderService) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;
        private readonly IOrderService _orderService = orderService;

        [Authorize(Roles = "Admin")]
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] string status)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
                return NotFound($"Order with ID {id} not found.");
            if (!Enum.TryParse<OrderStatus>(status, true, out var newStatus))
                return BadRequest("Invalid order status.");
            order.Status = newStatus;
            await _context.SaveChangesAsync();
            return Ok($"Order ID {id} status updated to {newStatus}.");
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(CreateOrderDTO createOrderDto)
        {
            Guid? userId = null;

            if (User.Identity != null && User.Identity.IsAuthenticated)
            {
                var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (!string.IsNullOrEmpty(userIdString))
                {
                    userId = Guid.Parse(userIdString);
                }
            }

            var result = await _orderService.CreateOrderAsync(userId, createOrderDto);

            if (!result.Success)
            {
                if (result.IsConcurrencyError)
                    return Conflict(result.ErrorMessage);
                return BadRequest(result.ErrorMessage);
            }

            return Ok(new { OrderId = result.Data, Message = "Order created successfully." });
        }

        [HttpGet("my")]
        [Authorize]
        public async Task<IActionResult> GetMyOrders()
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdString))
                return Unauthorized();

            var userId = Guid.Parse(userIdString);

            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Sneaker)
                .OrderByDescending(o => o.OrderDate)
                .Select(o => new
                {
                    o.Id,
                    o.OrderDate,
                    o.FirstName,
                    o.LastName,
                    o.PhoneNumber,
                    o.Address,
                    o.TotalPrice,
                    Items = o.OrderItems.Select(oi => new
                    {
                        oi.SneakerId,
                        SneakerName = oi.Sneaker!.Title,
                        oi.Size,
                        oi.Quantity,
                        oi.Price
                    }).ToList()
                })
                .ToListAsync();
            return Ok(orders);
        }
    }
}
