using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SneakersShop.Application.DTO
{
    public record CreateBrandDTO
    {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;
    }
}
