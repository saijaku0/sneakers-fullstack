using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SneakersShop.Application.DTO
{
    public class CreateProductStockDTO
    {
        public record CreateProductStockDTORecord
        {

            [Required]
            [Range(30, 50, ErrorMessage = "Size must be between 30 and 50 characters.")]
            public int Size { get; set; }
            [Required]
            [Range(0, int.MaxValue, ErrorMessage = "Quantity must be a positive number.")]
            public int Quantity { get; set; }
        }
    }
}
