using System.Diagnostics;
using GentlemensClub.Models;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers.Finance;

public class CryptoController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public CryptoController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }
    
    public IActionResult Crypto()
    {
        return View("~/Views/Finance/Crypto.cshtml");
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}