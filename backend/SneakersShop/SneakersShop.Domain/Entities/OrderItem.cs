namespace SneakersShop.Domain.Entities
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; } = null;
        public int SneakerId { get; set; }
        public Sneaker? Sneaker { get; set; } = null;
        public int Quantity { get; set; }
        public int Size { get; set; }
        public decimal Price { get; set; }
    }
}
