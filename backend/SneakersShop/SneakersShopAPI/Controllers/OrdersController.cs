using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SneakersShop.Application.DTO;
using SneakersShop.Domain.Entities;
using SneakersShop.Domain.Enums;
using SneakersShop.Infrastructure;
using System.Security.Claims;

namespace SneakersShop.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

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
            User? user = null;

            if (User.Identity != null && User.Identity.IsAuthenticated)
            {
                var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (!string.IsNullOrEmpty(userIdString))
                {
                    userId = Guid.Parse(userIdString);
                    user = await _context.Users.FindAsync(userId);
                }
            }

            var order = new Order
            {
                UserId = userId,
                User = user,
                OrderDate = DateTime.UtcNow,
                TotalPrice = 0,

                FirstName = createOrderDto.FirstName,
                LastName = createOrderDto.LastName,
                PhoneNumber = createOrderDto.PhoneNumber,
                Address = createOrderDto.Address,

                OrderItems = new List<OrderItem>()
            };

            foreach (var itemDto in createOrderDto.Items)
            {
                var stockEntry = await _context.ProductStocks
                    .Include(s => s.Sneaker)
                    .FirstOrDefaultAsync(s => s.SneakerId == itemDto.SneakerId && s.Size == itemDto.Size);

                if (stockEntry == null)
                    return BadRequest($"Sneaker with ID {itemDto.SneakerId} and size {itemDto.Size} is not available in stock.");

                if (stockEntry.Quantity < itemDto.Quantity)
                    return BadRequest($"Insufficient stock for Sneaker ID {itemDto.SneakerId} in size {itemDto.Size}. Requested: {itemDto.Quantity}, Available: {stockEntry.Quantity}.");

                stockEntry.Quantity -= itemDto.Quantity;
                stockEntry.Version = Guid.NewGuid();

                var orderItem = new OrderItem
                {
                    SneakerId = itemDto.SneakerId,
                    Size = itemDto.Size,
                    Quantity = itemDto.Quantity,
                    Price = stockEntry.Sneaker!.Price,
                    Order = order
                };
                order.OrderItems.Add(orderItem);
                order.TotalPrice += orderItem.Price * itemDto.Quantity;
            }
            _context.Orders.Add(order);
            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { OrderId = order.Id, Message = "Order created successfully." });
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict("A concurrency error occurred while processing your order. Please try again.");
            }
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
