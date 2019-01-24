using AutoServiceBook.Models;
using AutoServiceBook.Models.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceBook.Services
{
    public interface IStatsService
    {
        Task<decimal> GetCost(StatsPeriod period, long vehicleId, ExpenseType? expenseType = null);

        Task<IEnumerable<StatsDistributionResponse>> GetDistribution(StatsPeriod period, long vehicleId);

        Task<double> GetFuelUsage(StatsPeriod period, long vehicleId);

        Task<IEnumerable<StatsLastYearChartDataResponse>> GetLastYearChartData(long vehicleId);
    }
}