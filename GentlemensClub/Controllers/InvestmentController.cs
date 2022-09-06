using GentlemensClub.Models.Stocks;
using GentlemensClub.Models.YearlyStatistics;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers
{
    public class InvestmentController : Controller
    {
        const string ApiKey = "MSib4HhZXcRqPQKDsqXcR25R6eMhYcQKiR8CvBv4";
        public async Task<int> MaxPage()
        {
            var apiHandler = new ApiHandler.ApiHandler();
            var endpoints = (await apiHandler.GetDataByUrl<Stocks>($"https://api.stockdata.org/v1/entity/search?exchanges=NASDAQ&api_token={ApiKey}")).Meta;
            var maxPage = endpoints.Found / endpoints.Limit + 1;
            return maxPage;
        }

        public async Task<IActionResult> Stocks(int page = 1)
        {
            var apiHandler = new ApiHandler.ApiHandler();
            var stocks =
                await apiHandler.GetDataByUrl<Stocks>($"https://api.stockdata.org/v1/entity/search?exchanges=NASDAQ&page={page}&api_token={ApiKey}");
            var stockList = stocks.Data;
            ViewBag.StockList = stockList;
            ViewBag.Page = page;
            ViewBag.MaxPage = await MaxPage();
            return View();
        }

        public async Task<IActionResult> StockInfo(string? symbol)
        {
            var apiHandler = new ApiHandler.ApiHandler();
            var stockInfo =
                (await apiHandler.GetDataByUrl<SelectedStock>(
                    $"https://api.stockdata.org/v1/data/eod?symbols={symbol}&api_token={ApiKey}")).Data;
            var yearlyInfo = stockInfo.Select(x => x);
            ViewBag.YearlyInfo = yearlyInfo;
            return View();
        }
    }
}
