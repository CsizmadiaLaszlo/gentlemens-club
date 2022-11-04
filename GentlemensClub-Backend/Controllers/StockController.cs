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

}

