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

        public IActionResult Reservation()
        {
            ViewData["tableId"] = HttpContext.Request.Query["table"];
            return View();
        }

        public IActionResult ReservationSuccess()
        {
            ViewData["tableId"] = HttpContext.Request.Query["table"];
            return View();
        }
    }
}
