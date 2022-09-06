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
