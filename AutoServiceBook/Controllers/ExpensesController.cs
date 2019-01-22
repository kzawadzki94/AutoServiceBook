using AutoMapper;
using AutoServiceBook.Models;
using AutoServiceBook.Models.Requests;
using AutoServiceBook.Models.Responses;
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

            var response = _mapper.Map<ExpenseResponse>(expense);

            return Ok(response);
        }

        // GET: api/Expenses
        [HttpGet]
        public async Task<IEnumerable<ExpenseResponse>> GetExpenses()
        {
            var expenses = await _repo.GetAllAsync();
            expenses = expenses.Where(e => e.OwnerId == getCurrentUserId());
            return expenses.Select(e => _mapper.Map<ExpenseResponse>(e));
        }

        // POST: api/Expenses
        [HttpPost]
        public async Task<IActionResult> PostExpense([FromBody] ExpenseAddOrChangeRequest request)
        {
            if (!ModelState.IsValid || !TryValidateModel(request))
                return BadRequest(ModelState.Values.SelectMany(m => m.Errors));

            if (request.OwnerId != getCurrentUserId())
                return Unauthorized();

            var expense = _mapper.Map<Expense>(request);

            await _repo.AddAsync(expense);

            return CreatedAtAction("GetExpense", new { id = expense.ExpenseId }, request);
        }

        // PUT: api/Expenses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpense([FromRoute] long id, [FromBody] ExpenseAddOrChangeRequest request)
        {
            if (!ModelState.IsValid || !TryValidateModel(request))
                return BadRequest(ModelState.Values.SelectMany(m => m.Errors));

            var expense = _mapper.Map<Expense>(request);

            var currentExpense = await _repo.GetByIdWithoutTrackingAsync(id);

            if (currentExpense is null)
                return NotFound();

            if (currentExpense.OwnerId != getCurrentUserId())
                return Unauthorized();

            expense.ExpenseId = id;

            var updateSucceed = await _repo.UpdateAsync(expense);

            if (!updateSucceed)
                return NotFound();

            return Ok(request);
        }

        private string getCurrentUserId()
            => HttpContext.User.FindFirst("user_id").Value;
    }
}