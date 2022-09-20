using GentlemensClub.Models.Account;
using GentlemensClub.Services.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers
{
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        // public IActionResult Index()
        // {
        //     return View();
        // }

        public IActionResult Registration()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Registration([FromForm] RegistrationData data)
        {
            if (!ModelState.IsValid) return await Task.Run(View);

            if (await _accountService.RegistrationIsValid(data))
            {
                await _accountService.CreateAccount(data);

                var credential = new LoginCredential()
                {
                    Username = data.Username,
                    Password = data.Password
                };
                var claimsPrincipal = await _accountService.CreateClaimsPrincipal(credential);
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
