using System.Diagnostics;
using GentlemensClub.Models;
using GentlemensClub.Models.Stocks;
using GentlemensClub.Models.TodayStatistic;
using GentlemensClub.Models.WeeklyStatistics;
using GentlemensClub.Models.YearlyStatistics;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers.Finance;

[Route("finance")]
public class StockController : Controller
{
    const string ApiKey = "hY5rrMwpo64ZtqeqLRDztphuFoupB9N0FBffaBGU";

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
            (await apiHandler.GetDataByUrl<TodayStatistic>(
                $"https://api.stockdata.org/v1/data/quote?symbols={symbol}&api_token={ApiKey}")).Data;
        var todayInfo = stockInfo.Select(x => x);
        ViewBag.TodayInfo = todayInfo;
        return View("~/Views/Finance/StockInformation/SelectedStock.cshtml");
    }

    [Route("selected-stock/weekly-statistics")]
    public async Task<IActionResult> WeeklyStatistics(string? symbol)
    {
        var apiHandler = new ApiHandler.ApiHandler();
        var stockInfo =
            (await apiHandler.GetDataByUrl<WeeklyStatistics>(
                $"https://api.stockdata.org/v1/data/intraday?symbols={symbol}&api_token={ApiKey}")).Data;
        var weeklyInfo = stockInfo.Select(x => x);
        ViewBag.WeeklyInfo = weeklyInfo;
        return View("~/Views/Finance/StockInformation/WeeklyStatistics.cshtml");
    }

    [Route("selected-stock/yearly-statistics")]
    public async Task<IActionResult> YearlyStatistics(string? symbol)
    {
        var apiHandler = new ApiHandler.ApiHandler();
        var stockInfo =
            (await apiHandler.GetDataByUrl<YearlyStatistics>(
                $"https://api.stockdata.org/v1/data/eod?symbols={symbol}&api_token={ApiKey}")).Data;
        var yearlyInfo = stockInfo.Select(x => x);
        ViewBag.YearlyInfo = yearlyInfo;
        return View("~/Views/Finance/StockInformation/YearlyStatistics.cshtml");
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}