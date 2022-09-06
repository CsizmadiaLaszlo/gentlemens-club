using System.Diagnostics;
using GentlemensClub.Models;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers.Finance;

[Route("finance")]
public class AccountController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public AccountController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    [Route("account")]
    public IActionResult Account()
    {
        return View("~/Views/Finance/Account.cshtml");
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}