using System;
using System.Collections.Generic;
using System.Text;

namespace SneakersShop.Application.DTO
{
    public class ProductStockDTO
    {
        public record ProductStockDTORecord
        {
            public int Id { get; set; }
            public int Size { get; set; }
            public int Quantity { get; set; }
        }
    }
}
