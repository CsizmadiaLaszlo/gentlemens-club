using GentlemensClub.Models.Finance.Bank;

namespace GentlemensClub.Services.Interfaces.Finance.Bank;

public interface IBankService : IBankAccountService , IBankCurrencyService, IBankTransactionService
{
    Task SaveExchange(int bankAccountId, ExchangeDto exchangeData);
}