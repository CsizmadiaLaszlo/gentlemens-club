using System.Diagnostics;
using GentlemensClub.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers.Finance;

[Route("finance")]
public class BankAccountController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public BankAccountController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    [Route("account")]
    [Authorize]
    public IActionResult Account()
    {
        return View("~/Views/Finance/BankAccount.cshtml");
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}