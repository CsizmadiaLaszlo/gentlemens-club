using GentlemensClub.Models.Account;
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
        public IActionResult Login([FromForm] LoginCredential credential)
        {
            return View();
        }
    }
}
