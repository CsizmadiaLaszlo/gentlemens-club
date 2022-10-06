using System.Text.Json;
using GentlemensClub.Models.Finance.Bank;
using GentlemensClub.Services.Interfaces.Finance.Bank;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers.ApiControllers;

[Route("api/finance/bank")]
[ApiController]
// [Authorize]
public class BankAccountApiController : ControllerBase
{
    private IBankService BankService { get; set; }

    public BankAccountApiController(IBankService bankService)
    {
        BankService = bankService;
    }
    
    [HttpGet]
    [Route("currency")]
    public string GetCurrency([FromQuery] string acronym)
    {
        // int.TryParse(User.Claims.First(claim => claim.Type == "UserId").Value, out var userId);
        var currency = BankService.GetBankCurrency(1, acronym);
        return JsonSerializer.Serialize(currency.Result);
    }
    
    [HttpGet]
    [Route("currencies")]
    public string GetAllCurrency()
    {
        // int.TryParse(User.Claims.First(claim => claim.Type == "UserId").Value, out var userId);
        var currency = BankService.GetAllBankCurrencyByBankAccount(1);
        return JsonSerializer.Serialize(currency.Result.ToList());
    }
    
    [HttpGet]
    [Route("transaction")]
    public string GetAllTransaction()
    {
        // int.TryParse(User.Claims.First(claim => claim.Type == "UserId").Value, out var userId);
        var transactions = BankService.GetAllBankTransactionByBankAccount(1);
        return JsonSerializer.Serialize(transactions.Result.ToList());
    }
    
    [HttpPost]
    [Route("exchange")]
    public async Task ExchangeCurrency([FromBody] ExchangeDto exchangeData)
    {
        // int.TryParse(User.Claims.First(claim => claim.Type == "UserId").Value, out var userId);
        await BankService.SaveExchange(1, exchangeData);
    }
}