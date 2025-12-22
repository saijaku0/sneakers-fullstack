using Microsoft.EntityFrameworkCore;
using Moq;
using SneakersShop.Application.DTO;
using SneakersShop.Application.Interfaces;
using SneakersShop.Domain.Entities;
using SneakersShop.Infrastructure;
using SneakersShop.Infrastructure.Services;
using Xunit;

namespace SneakersShop.Test;

public class OrderServiceTests
{
    private ApplicationDbContext GetApplicationDbContext()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        return new ApplicationDbContext(options);
    }

    [Fact]
    public async Task CreateOrder_Should_ReduceStock_When_Successful()
    {
        var context = GetApplicationDbContext();
        var sneaker = new Sneaker {Id = 1, Title = "Nike Test", Price = 100, BrandId = 1, ImageUrl = "img" };
        var stock = new ProductStock { Id = 1, SneakerId = 1, Size = 42, Quantity = 10, Sneaker = sneaker }; // Было 10 штук

        context.Sneakers.Add(sneaker);
        context.ProductStocks.Add(stock);
        await context.SaveChangesAsync();

        var mockEmailService = new Mock<IEmailService>();
        var service = new OrderService(context, mockEmailService.Object);
        var orderDto = new CreateOrderDTO
        {
            FirstName = "Test",
            LastName = "User",
            PhoneNumber = "123",
            Address = "Street",
            Items = new List<CreateOrderItemDTO>
                {
                    new CreateOrderItemDTO { SneakerId = 1, Size = 42, Quantity = 2 }
                }
        };

        var result = await service.CreateOrderAsync(null, orderDto);

        Assert.True(result.Success);
        Assert.True(result.Data > 0);

        var updatedStock = await context.ProductStocks.FindAsync(1);
        Assert.Equal(8, updatedStock.Quantity); // Must be 8
    }

    [Fact]
    public async Task CreateOrder_Should_Fail_When_NotEnoughStock()
    {
        var context = GetApplicationDbContext();
        var sneaker = new Sneaker { Id = 2, Title = "Rare Sneaker", Price = 500, BrandId = 1, ImageUrl = "img" };
        var stock = new ProductStock { Id = 2, SneakerId = 2, Size = 40, Quantity = 1, Sneaker = sneaker };

        context.Sneakers.Add(sneaker);
        context.ProductStocks.Add(stock);
        await context.SaveChangesAsync();

        var mockEmailService = new Mock<IEmailService>();
        var service = new OrderService(context, mockEmailService.Object);
        var orderDto = new CreateOrderDTO
        {
            FirstName = "Greedy",
            LastName = "Buyer",
            PhoneNumber = "111",
            Address = "Home",
            Items = new List<CreateOrderItemDTO>
        {
            new CreateOrderItemDTO { SneakerId = 2, Size = 40, Quantity = 5 }
        }
        };

        var result = await service.CreateOrderAsync(null, orderDto);

        Assert.False(result.Success); 
        Assert.Contains("available", result.ErrorMessage); 

        var dbStock = await context.ProductStocks.FindAsync(2);
        Assert.NotNull(dbStock);
        Assert.Equal(1, dbStock.Quantity); // It was 1 and it remains so.
    }
}
