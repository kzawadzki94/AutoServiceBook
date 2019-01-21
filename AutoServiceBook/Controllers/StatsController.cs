﻿using AutoServiceBook.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        //GET: api/stats/costs/month/
        [HttpGet("costs/{period}")]
        public IActionResult GetCost([FromRoute] string period, [FromQuery] string type, [FromQuery] long vehicleId)
        {
            if (period == string.Empty)
                return NotFound();

            var cost = _statsService.GetCost(period, vehicleId, type);

            return Ok(cost);
        }

        //GET: api/stats/costformonth/01/2019
        [HttpGet("costformonth/{month}/{year}")]
        public IActionResult GetCostForGivenMonth([FromRoute] int month, [FromRoute] int year, [FromQuery] long vehicleId)
        {
            if (month < 1 || month > 12 || year < 0)
                return NotFound();

            var cost = _statsService.GetCostForGivenMonth(month, year, vehicleId);

            return Ok(cost);
        }

        //GET: api/stats/distribution/month
        [HttpGet("distribution/{period}")]
        public IActionResult GetDistribution([FromRoute] string period, [FromQuery] long vehicleId)
        {
            if (period == string.Empty)
                return NotFound();

            var distribution = _statsService.GetDistribution(period, vehicleId);

            return Ok(distribution);
        }

        //GET: api/stats/fuelusage/month
        [HttpGet("fuelusage/{period}")]
        public IActionResult GetFuelUsage([FromRoute] string period, [FromQuery] long vehicleId)
        {
            if (period == string.Empty)
                return NotFound();

            var usage = _statsService.GetFuelUsage(period, vehicleId);

            return Ok(usage);
        }
    }
}