using AutoServiceBook.Models;
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

        public async Task<decimal> GetCost(string period, long vehicleId, string type = "")
        {
            ExpenseType? expenseType = null;
            try
            {
                expenseType = type == string.Empty || type == null ? null : (ExpenseType?)Enum.Parse(typeof(ExpenseType), type);
            }
            catch
            {
                // enum parse failed
                return 0;
            }

            var costs = getTotalCost(period, vehicleId, expenseType);

            if (costs is null || !costs.Any())
                return 0;

            return costs.Sum(e => e.Count * e.Price);
        }

        public async Task<Dictionary<ExpenseType, double>> GetDistribution(string period, long vehicleId)
        {
            var distribution = new Dictionary<ExpenseType, double>();
            var costs = getTotalCost(period, vehicleId);

            if (costs is null || !costs.Any())
                return distribution;

            foreach (ExpenseType expenseType in Enum.GetValues(typeof(ExpenseType)))
            {
                var totalCostOfType = costs.Where(e => e.Type == expenseType).Sum(e => e.Count * e.Price);
                var percentage = (double) totalCostOfType / (double) await GetCost(period, vehicleId);
                distribution.Add(expenseType, percentage);
            }

            return distribution;
        }

        private IEnumerable<Expense> getTotalCost(string period, long vehicleId, ExpenseType? type = null)
        {
            var startDate = getStartDateForPeriod(period);

            var costs = _expensesRepo.GetAll().Where(e => e.Date > startDate);

            if (costs != null && vehicleId != 0)
                costs = costs.Where(e => e.VehicleId == vehicleId);

            if (type != null)
                costs = costs.Where(e => e.Type == type);

            return costs;
        }

        private DateTime getStartDateForPeriod(string period)
        {
            var startDate = DateTime.Now;
            switch (period)
            {
                case "month":
                    startDate = startDate.AddMonths(-1);
                    break;
                case "year":
                    startDate = startDate.AddYears(-1);
                    break;
                case "week":
                    startDate = startDate.AddDays(-7);
                    break;
                default:
                    startDate = new DateTime();
                    break;
            }

            return startDate;
        }
    }
}