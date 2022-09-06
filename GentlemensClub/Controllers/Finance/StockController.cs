using System.Diagnostics;
using GentlemensClub.Models;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers.Finance;

[Route("finance")]
public class StockController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public StockController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }
    
    [Route("stock")]
    public IActionResult Stock()
    {
        return View("~/Views/Finance/Stock.cshtml");
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}