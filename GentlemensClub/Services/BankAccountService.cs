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

    public void CreateBankAccount(Account account)
    {
        var bankAccount = new BankAccount
        {
            AccountId = account.Id
        };

        BankAccountDao.Add(bankAccount);

        var defaultCurrencies = new List<Currency>()
        {
            new()
            {
                BankAccountId = bankAccount.Id,
                Name = "United States Dollar",
                Symbol = "$",
                Acronym = "USD",
                Country = "us",
                Value = 0.00,
            },
            new()
            {
                BankAccountId = bankAccount.Id,
                Name = "Euro",
                Symbol = "€",
                Acronym = "EUR",
                Country = "eu",
                Value = 0.00,
            },
            new()
            {
                BankAccountId = bankAccount.Id,
                Name = "Hungarian Forint",
                Symbol = "Ft",
                Acronym = "HUF",
                Country = "hu",
                Value = 0.00,
            }
        };
        foreach (var currency in defaultCurrencies)
        {
            AddCurrency(currency);
        }
    }

    public void RemoveBankAccount(BankAccount bankAccount)
    {
        BankAccountDao.Remove(bankAccount.Id);
    }

    public BankAccount GetBankAccountById(int id)
    {
        return BankAccountDao.Get(id) ?? throw new InvalidOperationException($"No bank account with id: {id}");
    }

    public void AddCurrency(Currency currency)
    {
        CurrencyDao.Add(currency);
    }

    public void RemoveCurrency(int currencyId)
    {
        CurrencyDao.Remove(currencyId);
    }

    public Currency GetCurrency(int id)
    {
        return CurrencyDao.Get(id);
    }
    
    public List<Currency> GetAllCurrency(int bankAccountId)
    {
        return CurrencyDao.GetAll(bankAccountId);
    }

}