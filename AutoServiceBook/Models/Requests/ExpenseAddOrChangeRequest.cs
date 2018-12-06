using System;
using System.ComponentModel.DataAnnotations;

namespace AutoServiceBook.Models.Requests
{
    public class ExpenseAddOrChangeRequest
    {
        [Required(ErrorMessage = "Vehicle id must be provided!")]
        public long VehicleId { get; set; }

        [Required(ErrorMessage = "Owner id must be provided!")]
        public string OwnerId { get; set; }

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