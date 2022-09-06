using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
