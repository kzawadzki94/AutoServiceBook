using AutoMapper;
using AutoServiceBook.Models;
using AutoServiceBook.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoServiceBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ExpensesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Expense> _repo;
        public ExpensesController(IRepository<Expense> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        // DELETE: api/Expenses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense([FromRoute] long id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var expense = await _repo.GetByIdAsync(id);

            if (expense is null)
                return NotFound();

            if (expense.OwnerId != getCurrentUserId())
                return Unauthorized();

            await _repo.DeleteAsync(id);

            return Ok(expense);
        }

        // GET: api/Expenses/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetExpense([FromRoute] long id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var expense = await _repo.GetByIdAsync(id);

            if (expense is null)
                return NotFound();

            if (expense.OwnerId != getCurrentUserId())
                return Unauthorized();

            return Ok(expense);
        }

        // GET: api/Expenses
        [HttpGet]
        public IEnumerable<Expense> GetExpenses()
        {
            return _repo.GetAll().Where(e => e.OwnerId == getCurrentUserId());
        }
        // POST: api/Expenses
        [HttpPost]
        public async Task<IActionResult> PostExpense([FromBody] Expense request)
        {
            if (!ModelState.IsValid || !TryValidateModel(request))
                return BadRequest(ModelState.Values.SelectMany(m => m.Errors));

            if (request.OwnerId != getCurrentUserId())
                return Unauthorized();

            await _repo.AddAsync(request);

            return CreatedAtAction("GetVehicle", new { id = request.ExpenseId }, request);
        }

        // PUT: api/Expenses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpense([FromRoute] long id, [FromBody] Expense request)
        {
            if (!ModelState.IsValid || !TryValidateModel(request))
                return BadRequest(ModelState.Values.SelectMany(m => m.Errors));

            //var expense = _mapper.Map<Vehicle>(request);

            var currentExpense = await _repo.GetByIdWithoutTrackingAsync(id);

            if (currentExpense is null)
                return NotFound();

            if (currentExpense.OwnerId != getCurrentUserId())
                return Unauthorized();

            //expense.VehicleId = id;
            //expense.OwnerId = currentExpense.OwnerId;

            var updateSucceed = await _repo.UpdateAsync(request);

            if (!updateSucceed)
                return NotFound();

            return Ok(request);
        }
        private string getCurrentUserId()
            => HttpContext.User.FindFirst("user_id").Value;
    }
}