using System.Diagnostics;
using GentlemensClub.Models;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers.Finance;

[Route("finance")]
public class CardController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public CardController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    [Route("cards")]
    public IActionResult Card()
    {
        return View("~/Views/Finance/Card.cshtml");
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}