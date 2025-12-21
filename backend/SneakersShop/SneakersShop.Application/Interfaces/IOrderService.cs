using SneakersShop.Application.DTO;
using SneakersShop.Application.Models;

namespace SneakersShop.Application.Interfaces
{
    public interface IOrderService
    {
        Task<ServiceResult<int>> CreateOrderAsync(Guid? userId, CreateOrderDTO createOrderDto);
    }
}
