using AutoServiceBook.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceBook.Services
{
    public interface IStatsService
    {
        Task<decimal> GetCost(string period, long vehicleId, string type = "");
        Task<Dictionary<ExpenseType, double>> GetDistribution(string period, long vehicleId);
    }
}