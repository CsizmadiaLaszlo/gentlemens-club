using GentlemensClub.Daos.Implementations;
using GentlemensClub.Models.Account;
using GentlemensClub.Models.Finance.Bank;

namespace GentlemensClub.Services;

public class BankAccountService
{
    public IBankAccountDao BankAccountDao { get; }
    public ICurrencyDao CurrencyDao { get; }
    public ITransactionDao TransactionDao { get; }

    public BankAccountService(IBankAccountDao bankAccountDao, ICurrencyDao currencyDao, ITransactionDao transactionDao)
    {
        BankAccountDao = bankAccountDao;
        CurrencyDao = currencyDao;
        TransactionDao = transactionDao;
    }

}