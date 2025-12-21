using Microsoft.EntityFrameworkCore;
using SneakersShop.Application.DTO;
using SneakersShop.Application.Interfaces;
using SneakersShop.Application.Models;
using SneakersShop.Domain.Entities;

namespace SneakersShop.Infrastructure.Services
{
    public class OrderService (ApplicationDbContext context, IEmailService emailService) : IOrderService
    {
        private readonly IEmailService _emailService = emailService;
        private readonly ApplicationDbContext _context = context;

        public async Task<ServiceResult<int>> CreateOrderAsync(Guid? userId, CreateOrderDTO createOrderDto)
        {
            User? user = null;
            if (userId.HasValue)
                user = await _context.Users.FindAsync(userId.Value);

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
                var stockItem = await _context.ProductStocks
                    .Include(s => s.Sneaker)
                    .FirstOrDefaultAsync(si => si.SneakerId == itemDto.SneakerId && si.Size == itemDto.Size);

                if (stockItem == null)
                    return ServiceResult<int>.Fail($"Sneaker with ID {itemDto.SneakerId} in size {itemDto.Size} is out of stock.");

                if (stockItem.Quantity < itemDto.Quantity)
                    return ServiceResult<int>.Fail($"Only {stockItem.Quantity} items available for Sneaker ID {itemDto.SneakerId} in size {itemDto.Size}.");

                stockItem.Quantity -= itemDto.Quantity;
                stockItem.Version = Guid.NewGuid();

                var orderItem = new OrderItem
                {
                    OrderId = order.Id,
                    SneakerId = stockItem.SneakerId,
                    Quantity = itemDto.Quantity,
                    Size = itemDto.Size,
                    Price = stockItem.Sneaker.Price
                };
                order.OrderItems.Add(orderItem);
                order.TotalPrice += stockItem.Sneaker.Price * itemDto.Quantity;
            }

            _context.Add(order);
            try
            {
                await _context.SaveChangesAsync();

                if (user != null && !string.IsNullOrEmpty(user.Email))
                {
                    var emailBody = $"Dear {createOrderDto.FirstName},\n\n" +
                                    $"Thank you for your order! Your order ID is {order.Id}.\n" +
                                    $"Total Price: {order.TotalPrice:C}\n\n" +
                                    "We will notify you once your order is shipped.\n\n" +
                                    "Best regards,\n" +
                                    "Sneakers Shop Team";
                    await _emailService.SendEmailAsync(user.Email, "Order Confirmation", emailBody);
                }

                return ServiceResult<int>.Ok(order.Id);
            }
            catch (DbUpdateConcurrencyException)
            {
                return ServiceResult<int>.Conflict("A concurrency error occurred while creating the order.", true);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return ServiceResult<int>.Fail($"An error occurred while creating the order: {ex.Message}");
            }
        }
    }
}
