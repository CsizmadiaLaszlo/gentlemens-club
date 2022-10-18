using System.Diagnostics;
using GentlemensClub.Models;
using GentlemensClub.Models.Stocks;
using GentlemensClub.Models.TodayStatistic;
using GentlemensClub.Models.WeeklyStatistics;
using GentlemensClub.Models.YearlyStatistics;
using GentlemensClub.Services;
using GentlemensClub.Services.Interfaces.Finance.Stock;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers.Finance;

[ApiController]
[Route("api/finance/stock")]
public class StockApiController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public IStockApiService ApiHandler { get; set; }

    public StockApiController(ILogger<HomeController> logger, IStockApiService stockApi)
    {
        _logger = logger;
        ApiHandler = stockApi;
    }

    [HttpGet]
    public async Task<IActionResult> Stock([FromQuery] int? page)
    {
        return Ok(await ApiHandler.Stock(page));
    }

    [HttpGet]
    [Route("selected-stock")]
    public async Task<IActionResult> StockInfo([FromQuery] string? symbol)
    {
        return Ok(await ApiHandler.StockInfo(symbol));
    }

    [HttpGet]
    [Route("selected-stock/weekly-statistics")]
    public async Task<IActionResult> WeeklyStatistics([FromQuery] string? symbol)
    {
        return Ok(await ApiHandler.WeeklyStatistics(symbol));
    }

    [HttpGet]
    [Route("selected-stock/yearly-statistics")]
    public async Task<IActionResult> YearlyStatistics([FromQuery] string? symbol)
    {
        return Ok(await ApiHandler.YearlyStatistics(symbol));
    }

    [HttpGet]
    [Route("max-page")]
    public async Task<IActionResult> MaxStockPage()
    {
        return Ok(await ApiHandler.MaxPage());
    } 

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}