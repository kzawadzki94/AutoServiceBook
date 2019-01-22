﻿using AutoServiceBook.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceBook.Services
{
    public interface IStatsService
    {
        Task<decimal> GetCost(StatsPeriod period, long vehicleId, ExpenseType? expenseType = null);

        Task<Dictionary<ExpenseType, double>> GetDistribution(StatsPeriod period, long vehicleId);

        Task<double> GetFuelUsage(StatsPeriod period, long vehicleId);

        Task<decimal> GetCostForGivenMonth(int month, int year, long vehicleId);
    }
}