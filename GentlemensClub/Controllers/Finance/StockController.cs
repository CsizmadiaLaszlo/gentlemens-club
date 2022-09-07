using System.Diagnostics;
using GentlemensClub.Models;
using GentlemensClub.Models.Stocks;
using GentlemensClub.Models.YearlyStatistics;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers.Finance;

[Route("finance")]
public class StockController : Controller
{
    const string ApiKey = "z8cLmNOjx2nuLaQu1GQRuNvswMP6sZkeaAFsGroI";

    private readonly ILogger<HomeController> _logger;

    public StockController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public async Task<int> MaxPage()
    {
        var apiHandler = new ApiHandler.ApiHandler();
        var endpoints = (await apiHandler.GetDataByUrl<Stocks>($"https://api.stockdata.org/v1/entity/search?exchanges=NASDAQ&api_token={ApiKey}")).Meta;
        var maxPage = endpoints.Found / endpoints.Limit + 1;
        return maxPage;
    }

    [Route("stock")]
    public async Task<IActionResult> Stock(int page = 1)
    {
        var apiHandler = new ApiHandler.ApiHandler();
        var stocks =
            await apiHandler.GetDataByUrl<Stocks>($"https://api.stockdata.org/v1/entity/search?exchanges=NASDAQ&page={page}&api_token={ApiKey}");
        var stockList = stocks.Data;
        ViewBag.StockList = stockList;
        ViewBag.Page = page;
        ViewBag.MaxPage = await MaxPage();
        return View("~/Views/Finance/Stock.cshtml");
    }

    [Route("selected-stock")]
    public async Task<IActionResult> StockInfo(string? symbol)
    {
        var apiHandler = new ApiHandler.ApiHandler();
        var stockInfo =
            (await apiHandler.GetDataByUrl<SelectedStock>(
                $"https://api.stockdata.org/v1/data/eod?symbols={symbol}&api_token={ApiKey}")).Data;
        var yearlyInfo = stockInfo.Select(x => x);
        ViewBag.YearlyInfo = yearlyInfo;
        return View("~/Views/Finance/StockInformation/StockInformation.cshtml");
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}