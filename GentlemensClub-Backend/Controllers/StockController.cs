using System.Text.Json;
using GentlemensClub.Models.Stocks;
using GentlemensClub.Services.Interfaces.Finance.Stock;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers;

[Route("api/finance/stockData")]
[ApiController]
[Authorize]
public class StockController : Controller
{
    public IStockDatabaseService StockHandler { get; set; }

    public StockController(IStockDatabaseService stockData)
    {
        StockHandler = stockData;
    }

    [HttpPost]
    [Route("buy")]
    public async Task BuyStock([FromBody] BuyStockDto buyStock)
    {
        int.TryParse(User.Claims.First(claim => claim.Type == "UserId").Value, out var userId);
        await StockHandler.AddValue(userId, buyStock.Name, buyStock.Symbol, buyStock.Value);
    }

    [HttpPost]
    [Route("sell")]
    public async Task SellStock([FromBody] SellStockDto sellStock)
    {
        int.TryParse(User.Claims.First(claim => claim.Type == "UserId").Value, out var userId);
        await StockHandler.ReduceValue(userId, sellStock.Symbol, sellStock.Value);
    }

    [HttpGet]
    [Route("all")]
    public async Task<IActionResult> GetAllStock()
    {
        int.TryParse(User.Claims.First(claim => claim.Type == "UserId").Value, out var userId);
        return Ok(await StockHandler.GetAllStocks(userId));
    }

    [HttpGet]
    [Route("value")]
    public async Task<IActionResult> GetStockValue([FromRoute] string symbol)
    {
        int.TryParse(User.Claims.First(claim => claim.Type == "UserId").Value, out var userId);
        return Ok(await StockHandler.GetStockValue(userId, symbol));
    }
}

