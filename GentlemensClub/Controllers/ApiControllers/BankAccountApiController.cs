using System.Text.Json;
using GentlemensClub.Daos.Implementations;
using GentlemensClub.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers.ApiControllers;

[Route("api/finance")]
[ApiController]
[Authorize]
public class BankAccountApiController : ControllerBase
{
    public BankAccountService BankAccountService { get; set; }

    public BankAccountApiController()
    {
        BankAccountService = new BankAccountService(new BankAccountDao(), new CurrencyDao(), new TransactionDao());
    }
    
    [HttpGet]
    [Route("currency")]
    public string GetCurrency([FromQuery] string acronym)
    {
        var currency = BankAccountService.GetCurrency(acronym);
        return JsonSerializer.Serialize(currency);
    }
    [HttpGet]
    [Route("currencies")]
    public string GetAllCurrency()
    {
        var currency = BankAccountService.GetAllCurrency(1);
        return JsonSerializer.Serialize(currency);
    }
    [HttpGet]
    [Route("transaction")]
    public string GetAllTransaction()
    {
        var transactions = BankAccountService.GetAllTransaction(1);
        return JsonSerializer.Serialize(transactions);
    }
}