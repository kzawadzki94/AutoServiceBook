using AutoMapper;
using AutoServiceBook.Models;
using AutoServiceBook.Models.Requests;
using AutoServiceBook.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoServiceBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class VehiclesController : ControllerBase
    {
        private readonly IRepository<Vehicle> _repo;
        private readonly IMapper _mapper;

        public VehiclesController(IRepository<Vehicle> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        // DELETE: api/Vehicles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle([FromRoute] long id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = await _repo.GetByIdAsync(id);

            if (vehicle is null)
                return NotFound();

            if (!doesUserOwnVehicle(vehicle.OwnerId))
                return Unauthorized();

            await _repo.DeleteAsync(id);

            return Ok(vehicle);
        }

        // GET: api/Vehicles/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle([FromRoute] long id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = await _repo.GetByIdAsync(id);

            if (vehicle is null)
                return NotFound();

            if (!doesUserOwnVehicle(vehicle.OwnerId))
                return Unauthorized();

            return Ok(vehicle);
        }

        // GET: api/Vehicles
        [HttpGet]
        public async Task<IEnumerable<Vehicle>> GetVehicles()
        {
            var vehicles = await _repo.GetAllAsync();
            return vehicles.Where(v => doesUserOwnVehicle(v.OwnerId));
        }

        // POST: api/Vehicles
        [HttpPost]
        public async Task<IActionResult> PostVehicle([FromBody] VehicleAddOrChangeRequest request)
        {
            if (!ModelState.IsValid || !TryValidateModel(request))
                return BadRequest(ModelState.Values.SelectMany(m => m.Errors));

            if (!doesUserOwnVehicle(request.OwnerId))
                return Unauthorized();

            var vehicle = _mapper.Map<Vehicle>(request);

            await _repo.AddAsync(vehicle);

            return CreatedAtAction("GetVehicle", new { id = vehicle.VehicleId }, vehicle);
        }

        // PUT: api/Vehicles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicle([FromRoute] int id, [FromBody] VehicleAddOrChangeRequest request)
        {
            if (!ModelState.IsValid || !TryValidateModel(request))
                return BadRequest(ModelState.Values.SelectMany(m => m.Errors));

            var vehicle = _mapper.Map<Vehicle>(request);

            var currentVehicle = await _repo.GetByIdWithoutTrackingAsync(id);

            if (currentVehicle is null)
                return NotFound();

            if (!doesUserOwnVehicle(currentVehicle.OwnerId))
                return Unauthorized();

            vehicle.VehicleId = id;
            vehicle.OwnerId = currentVehicle.OwnerId;

            var updateSucceed = await _repo.UpdateAsync(vehicle);

            if (!updateSucceed)
                return NotFound();

            return Ok(vehicle);
        }

        private bool doesUserOwnVehicle(string userId)
            => HttpContext.User.FindFirst("user_id").Value == userId;
    }
}