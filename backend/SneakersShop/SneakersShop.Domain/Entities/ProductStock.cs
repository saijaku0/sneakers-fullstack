using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SneakersShop.Domain.Entities
{
    public class ProductStock
    {
        public int Id { get; set; }
        public int Size { get; set; } = 0;
        public int Quantity { get; set; } = 0;
        public int SneakerId { get; set; }
        [JsonIgnore]
        public required Sneaker Sneaker { get; set; }
        [ConcurrencyCheck]
        public Guid Version { get; set; } = Guid.NewGuid();
    }
}
