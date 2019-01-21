using AutoMapper;
using AutoServiceBook.Models;
using AutoServiceBook.Models.Requests;
using AutoServiceBook.Models.Responses;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AutoServiceBook.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IMapper mapper;

        public AccountController(UserManager<AppUser> userManager, IMapper mapper)
        {
            this.userManager = userManager;
            this.mapper = mapper;
        }

        //GET: api/Account/
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var user = await userManager.FindByEmailAsync(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (user is null)
                return NotFound("User not found!");

            return Ok(mapper.Map<AppUser, UserInfoResponse>(user));
        }

        //POST: api/Account/
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RegisterAccountRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.Values.SelectMany(m => m.Errors));

            var user = mapper.Map<AppUser>(request);
            var createActionResult = await userManager.CreateAsync(user, request.Password);

            return createActionResult.Succeeded ? Ok("User created") : Ok(createActionResult.Errors.ToList());
        }
    }
}