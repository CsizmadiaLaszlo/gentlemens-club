using System.Text.Json;
using GentlemensClub.Services.Interfaces.Finance.Bank;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers.ApiControllers;

[Route("api/finance")]
[ApiController]
[Authorize]
public class BankAccountApiController : ControllerBase
{
    public IBankService BankService { get; set; }

    public BankAccountApiController(IBankService bankService)
    {
        BankService = bankService;
    }
    
    [HttpGet]
    [Route("currency")]
    public string GetCurrency([FromQuery] string acronym)
    {
        var currency = BankService.GetBankCurrency(1, acronym);
        return JsonSerializer.Serialize(currency.Result);
    }
    [HttpGet]
    [Route("currencies")]
    public string GetAllCurrency()
    {
        var currency = BankService.GetAllBankCurrencyByBankAccount(1);
        return JsonSerializer.Serialize(currency.Result.ToList());
    }
    [HttpGet]
    [Route("transaction")]
    public string GetAllTransaction()
    {
        var transactions = BankService.GetAllBankTransactionByBankAccount(1);
        return JsonSerializer.Serialize(transactions.Result.ToList());
    }
}