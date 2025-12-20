using SneakersShop.Domain.Enums;

namespace SneakersShop.Domain.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; } = new DateTime();
        public Guid? UserId { get; set; }
        public required User? User { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public List<OrderItem> OrderItems { get; set; } = [];
        public OrderStatus Status { get; set; } = OrderStatus.New;
        public decimal TotalPrice { get; set; }
    }
}
