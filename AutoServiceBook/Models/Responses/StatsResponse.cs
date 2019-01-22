using System.Collections.Generic;

namespace AutoServiceBook.Models.Responses
{
    public class StatsResponse
    {
        public decimal FuelCost { get; set; }
        public double FuelUsage { get; set; }
        public decimal InsuranceCost { get; set; }
        public decimal OtherCost { get; set; }
        public decimal ServiceCost { get; set; }
        public decimal SparePartCost { get; set; }
        public decimal Total { get; set; }
    }
}