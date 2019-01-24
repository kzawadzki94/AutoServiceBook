using AutoServiceBook.Models;
using AutoServiceBook.Models.Responses;
using AutoServiceBook.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AutoServiceBook.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class StatsController : ControllerBase
    {
        private IStatsService _statsService;

        public StatsController(IStatsService statsService)
        {
            _statsService = statsService;
        }

        [HttpGet("costs/{period}")]
        public async Task<IActionResult> GetCosts([FromRoute] string period, [FromQuery] long vehicleId)
        {
            StatsPeriod periodValue;

            if (!Enum.TryParse(period, true, out periodValue))
                return NotFound();

            var stats = new StatsResponse()
            {
                FuelCost = await _statsService.GetCost(periodValue, vehicleId, ExpenseType.Fuel),
                FuelUsage = await _statsService.GetFuelUsage(periodValue, vehicleId),
                InsuranceCost = await _statsService.GetCost(periodValue, vehicleId, ExpenseType.Insurance),
                OtherCost = await _statsService.GetCost(periodValue, vehicleId, ExpenseType.Other),
                ServiceCost = await _statsService.GetCost(periodValue, vehicleId, ExpenseType.Service),
                SparePartCost = await _statsService.GetCost(periodValue, vehicleId, ExpenseType.SparePart),
                Total = await _statsService.GetCost(periodValue, vehicleId)
            };

            return Ok(stats);
        }

        //GET: api/stats/lastyearchart
        [HttpGet("lastyearchart")]
        public async Task<IActionResult> GetLastYearChartData([FromQuery] long vehicleId)
        {
            var cost = await _statsService.GetLastYearChartData(vehicleId);

            return Ok(cost);
        }

        //GET: api/stats/distribution/month
        [HttpGet("distribution/{period}")]
        public async Task<IActionResult> GetDistribution([FromRoute] string period, [FromQuery] long vehicleId)
        {
            StatsPeriod periodValue;

            if (!Enum.TryParse(period, true, out periodValue))
                return NotFound();

            var distribution = await _statsService.GetDistribution(periodValue, vehicleId);

            return Ok(distribution);
        }
    }
}