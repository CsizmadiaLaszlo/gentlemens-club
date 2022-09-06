using System.Security.Claims;
using GentlemensClub.Models.Account;
using GentlemensClub.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers
{
    public class AccountController : Controller
    {
        public AccountService AccountService { get; set; }

        public AccountController()
        {
            AccountService = new AccountService();
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Registration()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Registration([FromForm] RegistrationData data)
        {
            if (!ModelState.IsValid) return await Task.Run(View);

            if (AccountService.RegistrationIsValid(data))
            {
                AccountService.CreateAccount(data);

                var credential = new LoginCredential()
                {
                    Username = data.Username,
                    Password = data.Password
                };
                var claimsPrincipal = AccountService.CreateClaimsPrincipal(credential);
                await HttpContext.SignInAsync("LoginCookieAuth", claimsPrincipal);

                return Redirect("/");
            }

            return await Task.Run(View);
        }

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromForm] LoginCredential credential)
        {
            if (!ModelState.IsValid) return await Task.Run(View);

            if (AccountService.CredentialIsValid(credential))
            {
                var claimsPrincipal = AccountService.CreateClaimsPrincipal(credential);
                await HttpContext.SignInAsync("LoginCookieAuth", claimsPrincipal);

                return Redirect("/");
            }

            return await Task.Run(View);
        }

        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync("LoginCookieAuth");

            return Redirect("/");
        }
    }
}
