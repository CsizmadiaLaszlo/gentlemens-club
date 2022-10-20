using GentlemensClub.Services.Interfaces.Finance.Stock;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers.Finance;

[ApiController]
[Route("api/finance/stock")]
[Authorize]
public class StockApiController : Controller
{
    public IStockApiService ApiHandler { get; set; }

    public StockApiController(IStockApiService stockApi)
    {
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
}