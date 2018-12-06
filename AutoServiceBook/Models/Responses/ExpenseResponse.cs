using System;

namespace AutoServiceBook.Models.Responses
{
    public class ExpenseResponse
    {
        public long ExpenseId { get; set; }

        public long VehicleId { get; set; }

        public string OwnerId { get; set; }

        public ExpenseType Type { get; set; }

        public uint Count { get; set; }

        public decimal Price { get; set; }

        public string Details { get; set; }

        public DateTime? Date { get; set; }

        public ulong Mileage { get; set; }
    }
}