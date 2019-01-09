using AutoServiceBook.Models;
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

        //GET: api/stats/costs/month/
        [HttpGet("costs/{period}")]
        public async Task<IActionResult> GetCost([FromRoute] string period, [FromQuery] string type, [FromQuery] long vehicleId)
        {
            if (period == string.Empty)
                return NotFound();

            var cost = await _statsService.GetCost(period, vehicleId, type);

            return Ok(cost);
        }

        //GET: api/stats/distribution/month
        [HttpGet("distribution/{period}")]
        public async Task<IActionResult> GetDistribution([FromRoute] string period, [FromQuery] long vehicleId)
        {
            if (period == string.Empty)
                return NotFound();

            var distribution = await _statsService.GetDistribution(period, vehicleId);

            return Ok(distribution);
        }
    }
}