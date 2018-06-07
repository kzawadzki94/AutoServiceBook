using System.Security.Claims;
using System.Threading.Tasks;
using AutoServiceBook.Models;
using AutoServiceBook.Models.Requests;
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

        public AccountController(UserManager<AppUser> userManager)
        {
            this.userManager = userManager;
        }

        //GET: api/Account/
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var user = await userManager.FindByEmailAsync(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (user == null)
                return NotFound("User not found!");

            return Json(user);
        }
    }
}