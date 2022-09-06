using System.Diagnostics;
using GentlemensClub.Models;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers.Finance;

public class VaultController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public VaultController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }
    
    public IActionResult Vault()
    {
        return View("~/Views/Finance/Vault.cshtml");
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}