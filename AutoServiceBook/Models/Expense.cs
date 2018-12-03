using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceBook.Models
{
    public class Expense
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ExpenseId { get; set; }

        [ForeignKey("VehicleId")]
        [Required(ErrorMessage = "Vehicle id must be provided!")]
        public long VehicleId { get; set; }

        public Vehicle Vehicle { get; set; }

        [Required(ErrorMessage = "The expense type must be provided.")]
        public ExpenseType Type { get; set; }

        [Required(ErrorMessage = "The count value must be provided.")]
        public uint Count { get; set; }

        [Required(ErrorMessage = "The price must be provided.")]
        [DataType(DataType.Currency)]
        public decimal Price { get; set; }

        public string Details { get; set; }

        [DataType(DataType.Date)]
        public DateTime? Date { get; set; }

        public ulong Mileage { get; set; }
    }
}