using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers
{
    public class RestaurantController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Menu()
        {
            return View();
        }

        public IActionResult Tables()
        {
            return View();
        }
    }
}
