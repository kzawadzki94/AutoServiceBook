using AutoServiceBook.Models;
using AutoServiceBook.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AutoServiceBook.Services
{
    public class StatsService : IStatsService
    {
        private readonly IRepository<Expense> _expensesRepo;

        public StatsService(IRepository<Vehicle> vehiclesRepo, IRepository<Expense> expensesRepo)
        {
            _expensesRepo = expensesRepo;
        }

        public decimal GetCost(string period, long vehicleId, string type = "")
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

        public decimal GetCostForGivenMonth(int month, int year, long vehicleId)
        {
            var costs = _expensesRepo.GetAll().Where(e => e.Date.Value.Year == year && e.Date.Value.Month == month);

            if (costs != null && vehicleId != 0)
                costs = costs.Where(e => e.VehicleId == vehicleId);

            if (costs is null || !costs.Any())
                return 0;

            return costs.Sum(e => e.Count * e.Price);
        }

        public Dictionary<ExpenseType, double> GetDistribution(string period, long vehicleId)
        {
            var distribution = new Dictionary<ExpenseType, double>();
            var costs = getTotalCost(period, vehicleId);
            if (costs is null || !costs.Any())
                return distribution;
            foreach (ExpenseType expenseType in Enum.GetValues(typeof(ExpenseType)))
            {
                double percentage;
                try
                {
                    var totalCostOfType = costs.Where(e => e.Type == expenseType).Sum(e => e.Count * e.Price);
                    percentage = (double)totalCostOfType / (double)GetCost(period, vehicleId);
                } catch
                {
                    percentage = 0;
                }

                distribution.Add(expenseType, percentage * 100);
            }

            return distribution;
        }

        public double GetFuelUsage(string period, long vehicleId)
        {
            var startDate = getStartDateForPeriod(period);

            var fuelExpenses = getTotalCost(period, vehicleId, ExpenseType.Fuel).Where(e => e.Mileage != 0);
            ulong distance;
            long consumedFuel;

            try
            {
                var longestMileage = fuelExpenses.Select(e => e.Mileage).Max();
                var shortestMileage = fuelExpenses.Select(e => e.Mileage).Min();
                distance = longestMileage - shortestMileage;
                consumedFuel = fuelExpenses.Sum(e => e.Count);
            }
            catch
            {
                return 0;
            }

            return (double)consumedFuel / distance * 100;
        }

        private IEnumerable<Expense> getTotalCost(string period, long vehicleId, ExpenseType? type = null)
        {
            var startDate = getStartDateForPeriod(period);

            var costs = _expensesRepo.GetAllWhere(e => e.Date > startDate);

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