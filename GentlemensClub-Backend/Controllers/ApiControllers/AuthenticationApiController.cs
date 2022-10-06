using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using GentlemensClub.Models.Authentication;
using GentlemensClub.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace GentlemensClub.Controllers.ApiControllers
{
    [Route("api/authentication")]
    [ApiController]
    public class AuthenticationApiController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IAccountService _accountService;

        public AuthenticationApiController(IConfiguration configuration, IAccountService accountService)
        {
            _configuration = configuration;
            _accountService = accountService;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] LoginCredential credential)
        {
            if (await _accountService.CredentialIsValid(credential))
            {
                // Creating the security context
                var claims = await _accountService.CreateClaims(credential);

                var expiresAt = DateTime.UtcNow.AddMinutes(10);
                return Ok(new
                {
                    access_token = CreateToken(claims, expiresAt),
                    expires_at = expiresAt,
                });
            }

            ModelState.AddModelError("Unauthorized", "You are not authorized to access the endpoint.");
            return Unauthorized(ModelState);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegistrationData data)
        {
            if (await _accountService.RegistrationIsValid(data))
            {
                await _accountService.CreateAccount(data);

                var credential = new LoginCredential()
                {
                    Username = data.Username,
                    Password = data.Password
                };
                var claims = await _accountService.CreateClaims(credential);

                var expiresAt = DateTime.UtcNow.AddMinutes(10);
                return Ok(new
                {
                    access_token = CreateToken(claims, expiresAt),
                    expires_at = expiresAt,
                });
            }

            return Conflict();
        }

        private string CreateToken(IEnumerable<Claim> claims, DateTime expiresAt)
        {
            var secretKey = Encoding.ASCII.GetBytes(_configuration.GetValue<string>("SecretKey"));

            var jwt = new JwtSecurityToken(
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: expiresAt,
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(secretKey),
                    SecurityAlgorithms.HmacSha256Signature
                )
            );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
