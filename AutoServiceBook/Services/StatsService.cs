using AutoServiceBook.Models;
using AutoServiceBook.Models.Responses;
using AutoServiceBook.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoServiceBook.Services
{
    public class StatsService : IStatsService
    {
        private readonly IRepository<Expense> _expensesRepo;

        public StatsService(IRepository<Vehicle> vehiclesRepo, IRepository<Expense> expensesRepo)
        {
            _expensesRepo = expensesRepo;
        }

        public async Task<decimal> GetCost(StatsPeriod period, long vehicleId, ExpenseType? expenseType = null)
        {
            var costs = await getTotalCost(period, vehicleId, expenseType);

            if (costs is null || !costs.Any())
                return 0;

            return costs.Sum(e => e.Count * e.Price);
        }

        public async Task<decimal> GetCostForGivenMonth(int month, int year, long vehicleId)
        {
            var costs = await _expensesRepo.GetAllAsync();
            costs = costs.Where(e => e.Date.Value.Year == year && e.Date.Value.Month == month);

            if (costs != null && vehicleId != 0)
                costs = costs.Where(e => e.VehicleId == vehicleId);

            if (costs is null || !costs.Any())
                return 0;

            return costs.Sum(e => e.Count * e.Price);
        }

        public async Task<IEnumerable<StatsDistributionResponse>> GetDistribution(StatsPeriod period, long vehicleId)
        {
            var distribution = new List<StatsDistributionResponse>();
            var costs = await getTotalCost(period, vehicleId);

            if (costs is null || !costs.Any())
                return distribution;

            foreach (ExpenseType expenseType in Enum.GetValues(typeof(ExpenseType)))
            {
                double percentage;
                try
                {
                    var totalCostOfType = costs.Where(e => e.Type == expenseType).Sum(e => e.Count * e.Price);
                    percentage = (double)totalCostOfType / (double) await GetCost(period, vehicleId);
                } catch (Exception)
                {
                    percentage = 0;
                }

                if (double.IsNaN(percentage) || double.IsInfinity(percentage))
                    percentage = 0;

                distribution.Add(new StatsDistributionResponse() {
                    Name = expenseType.ToString(),
                    Value = Math.Round(percentage * 100, 2, MidpointRounding.AwayFromZero)
                });
            }

            return distribution;
        }

        public async Task<double> GetFuelUsage(StatsPeriod period, long vehicleId)
        {
            var startDate = getStartDateForPeriod(period);

            var fuelExpenses = await getTotalCost(period, vehicleId, ExpenseType.Fuel);
            fuelExpenses = fuelExpenses.Where(e => e.Mileage != 0);
            ulong distance;
            long consumedFuel;
            double usage = 0;

            try
            {
                var longestMileage = fuelExpenses.Select(e => e.Mileage).Max();
                var shortestMileage = fuelExpenses.Select(e => e.Mileage).Min();
                distance = longestMileage - shortestMileage;
                consumedFuel = fuelExpenses.Sum(e => e.Count);

                if (distance != 0)
                    usage = (double)consumedFuel / distance * 100;
            }
            catch (Exception)
            {
                return 0;
            }

            return usage;
        }

        private async Task<IEnumerable<Expense>> getTotalCost(StatsPeriod period, long vehicleId, ExpenseType? type = null)
        {
            var startDate = getStartDateForPeriod(period);

            var costs = await _expensesRepo.GetAllAsync();
            costs = costs.Where(e => e.Date > startDate);

            if (costs != null && vehicleId != 0)
                costs = costs.Where(e => e.VehicleId == vehicleId);

            if (type != null)
                costs = costs.Where(e => e.Type == type);

            return costs;
        }

        private DateTime getStartDateForPeriod(StatsPeriod period)
        {
            var startDate = DateTime.Now;
            switch (period)
            {
                case StatsPeriod.Month:
                    startDate = startDate.AddMonths(-1);
                    break;

                case StatsPeriod.Year:
                    startDate = startDate.AddYears(-1);
                    break;

                case StatsPeriod.Week:
                    startDate = startDate.AddDays(-7);
                    break;

                case StatsPeriod.AllTime:
                default:
                    startDate = new DateTime();
                    break;
            }

            return startDate;
        }
    }
}