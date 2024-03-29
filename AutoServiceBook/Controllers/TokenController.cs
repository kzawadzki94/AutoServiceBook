using AutoServiceBook.Models;
using AutoServiceBook.Models.Requests;
using AutoServiceBook.Models.Responses;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AutoServiceBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;

        public TokenController(IConfiguration configuration, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            this.configuration = configuration;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        //POST: api/token
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SignInRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.Values.SelectMany(m => m.Errors));

            AppUser user = await userManager.FindByEmailAsync(request.Email);

            if (user is null)
                return NotFound("User not found!");

            var checkPasswordResult = await signInManager.CheckPasswordSignInAsync(user, request.Password, lockoutOnFailure: false);

            if (!checkPasswordResult.Succeeded)
                return Unauthorized();

            var claims = new[]
            {
                    new Claim(JwtRegisteredClaimNames.Sub, request.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.GivenName, user.FirstName),
                    new Claim(JwtRegisteredClaimNames.FamilyName, user.LastName),
                    new Claim("user_id", user.Id.ToString())
            };

            var token = new JwtSecurityToken
            (
                issuer: configuration["Token:Issuer"],
                audience: configuration["Token:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(60),
                notBefore: DateTime.UtcNow,
                signingCredentials:
                    new SigningCredentials
                    (
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Token:Key"])),
                            SecurityAlgorithms.HmacSha256
                    )
            );

            return Ok
            (
                new TokenResponse() { Token = new JwtSecurityTokenHandler().WriteToken(token) }
            );
        }
    }
}