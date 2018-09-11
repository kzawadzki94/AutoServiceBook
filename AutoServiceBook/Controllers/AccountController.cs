using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using AutoServiceBook.Models;
using AutoServiceBook.Models.Requests;
using AutoServiceBook.Models.Responses;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace AutoServiceBook.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AccountController : Controller
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

            if (user == null)
                return NotFound("User not found!");

            return Json(mapper.Map<AppUser, UserInfoResponse>(user));
        }

        //POST: api/Account/Register
        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterAccountRequest request)
        {
            if (ModelState.IsValid)
            {
                var user = mapper.Map<AppUser>(request);
                var createActionResult = await userManager.CreateAsync(user, request.Password);

                if (createActionResult.Succeeded)
                    return Ok("User created");
                else
                    return Json(createActionResult.Errors);
            }
            return BadRequest(ModelState.Values.SelectMany(m => m.Errors));
        }
    }
}