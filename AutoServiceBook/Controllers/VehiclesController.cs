using AutoMapper;
using AutoServiceBook.Models;
using AutoServiceBook.Models.Requests;
using AutoServiceBook.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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
        public async Task<IActionResult> DeleteVehicle([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = await _repo.GetByIdAsync(id);

            if (vehicle is null)
                return NotFound();

            await _repo.DeleteAsync(id);

            return Ok(vehicle);
        }

        // GET: api/Vehicles/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = await _repo.GetByIdAsync(id);

            if (vehicle is null)
                return NotFound();

            return Ok(vehicle);
        }

        // GET: api/Vehicles
        [HttpGet]
        public IEnumerable<Vehicle> GetVehicles()
            => _repo.GetAll();

        // POST: api/Vehicles
        [HttpPost]
        public async Task<IActionResult> PostVehicle([FromBody] VehicleAddOrChangeRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = _mapper.Map<Vehicle>(request);

            await _repo.AddAsync(vehicle);

            return CreatedAtAction("GetVehicle", new { id = vehicle.CarId }, vehicle);
        }

        // PUT: api/Vehicles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicle([FromRoute] int id, [FromBody] VehicleAddOrChangeRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = _mapper.Map<Vehicle>(request);
            vehicle.CarId = id;

            var updateSucceed = await _repo.UpdateAsync(vehicle);

            if (!updateSucceed)
                return NotFound();

            return NoContent();
        }
    }
}