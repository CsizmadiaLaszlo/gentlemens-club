using System.Security.Claims;
using GentlemensClub.Models.Account;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Login([FromForm] LoginCredential credential)
        {
            if (!ModelState.IsValid) return await Task.Run(View);

            var credentialIsValid = credential.Username == "test" && credential.Password == "123";
            if (credentialIsValid)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, "test"),
                    new Claim(ClaimTypes.Email, "test@test.ts")
                };
                var identity = new ClaimsIdentity(claims, "LoginCookieAuth");
                ClaimsPrincipal claimsPrincipal = new ClaimsPrincipal(identity);

                await HttpContext.SignInAsync("LoginCookieAuth", claimsPrincipal);

                return Redirect("/");
            }

            return await Task.Run(View);
        }
    }
}
