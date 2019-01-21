using AutoServiceBook.Models;
using System.Collections.Generic;

namespace AutoServiceBook.Services
{
    public interface IStatsService
    {
        decimal GetCost(string period, long vehicleId, string type = "");

        Dictionary<ExpenseType, double> GetDistribution(string period, long vehicleId);

        double GetFuelUsage(string period, long vehicleId);

        decimal GetCostForGivenMonth(int month, int year, long vehicleId);
    }
}