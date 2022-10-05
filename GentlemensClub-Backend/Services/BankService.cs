using GentlemensClub.Data;
using GentlemensClub.Models.Account;
using GentlemensClub.Models.Finance.Bank;
using GentlemensClub.Services.Interfaces.Finance.Bank;
using Microsoft.EntityFrameworkCore;

namespace GentlemensClub.Services;

public class BankService : IBankService
{
    private readonly GentlemensClubContext _context;

    public BankService(GentlemensClubContext context)
    {
        _context = context;
    }

    public async Task AddBankAccount(Account account)
    {
        var bankAccount = CreateDefaultBankAccount(account.Id);
        await _context.BankAccounts.AddAsync(bankAccount);
        await _context.SaveChangesAsync();
    }

    public async Task<BankAccount> GetBankAccount(int bankAccountId)
    {
        return (await _context.BankAccounts
            .Include(bankAccount => bankAccount.Currencies)
            .Include(bankAccount => bankAccount.BankTransactions)
            .FirstOrDefaultAsync(bankAccount => bankAccount.Id == bankAccountId))!;
    }

    public async Task DeleteBankAccount(int id)
    {
        var bankAccount = await GetBankAccount(id);
        _context.BankAccounts.Remove(bankAccount);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateBankAccount(BankAccount bankAccount)
    {
        _context.BankAccounts.Update(bankAccount);
        await _context.SaveChangesAsync();
    }

    public async Task AddBankCurrency(int bankAccountId, BankCurrency bankCurrency)
    {
        // var bankAccount = GetBankAccount(bankAccountId);
        // bankAccount.Result.Currencies.Add(bankCurrency);
        // _context.BankAccounts.Update(bankAccount.Result);
        // await _context.SaveChangesAsync();
        throw new NotImplementedException();
    }

    public Task RemoveBankCurrency(int bankCurrencyId)
    {
        throw new NotImplementedException();
    }

    public Task UpdateBankCurrency(BankCurrency bankCurrency)
    {
        throw new NotImplementedException();
    }

    public async Task<BankCurrency> GetBankCurrency(int bankCurrencyId)
    {
        return (await _context.BankCurrencies.FirstOrDefaultAsync(currency => currency.Id == bankCurrencyId))!;
    }

    public async Task<BankCurrency> GetBankCurrency(int bankAccountId, string acronym)
    {
        var bankAccount = await _context.BankAccounts
            .Include(account => account.Currencies)
            .AsNoTracking()
            .FirstOrDefaultAsync(account => account.Id == bankAccountId);
        return bankAccount!.Currencies.First(currency => currency.Acronym == acronym);
    }

    public async Task<HashSet<BankCurrency>> GetAllBankCurrencyByBankAccount(int bankAccountId)
    {
        var bankAccount = await _context.BankAccounts
            .Include(account => account.Currencies)
            .AsNoTracking()
            .FirstOrDefaultAsync(account => account.Id == bankAccountId);
        return bankAccount!.Currencies;
    }

    public Task AddBankTransaction(int bankAccountId, BankTransaction bankTransaction)
    {
        throw new NotImplementedException();
    }

    public Task RemoveBankTransaction(int bankCurrencyId)
    {
        throw new NotImplementedException();
    }

    public Task UpdateBankTransaction(BankTransaction bankTransaction)
    {
        throw new NotImplementedException();
    }

    public async Task<BankTransaction> GetBankTransaction(int bankAccountId, int transactionId)
    {
        var bankAccount = await _context.BankAccounts
            .Include(account => account.BankTransactions)
            .AsNoTracking()
            .FirstOrDefaultAsync(account => account.Id == bankAccountId);
        return bankAccount!.BankTransactions.First(transaction => transaction.Id == transactionId);
    }

    public async Task<IOrderedEnumerable<BankTransaction>> GetAllBankTransactionByBankAccount(int bankAccountId)
    {
        var bankAccount = await _context.BankAccounts
            .Include(account => account.BankTransactions)
            .FirstOrDefaultAsync(account => account.Id == bankAccountId);
        return bankAccount!.BankTransactions.OrderByDescending(transaction => transaction.Id);
    }

    public async Task SaveExchange(int bankAccountId, ExchangeDto exchangeData)
    {
        var bankAccount = await _context.BankAccounts
            .Include(account => account.BankTransactions)
            .Include(account => account.Currencies)
            .FirstOrDefaultAsync(account => account.Id == bankAccountId);
        
        var fromCurrency = bankAccount!.Currencies.First(currency => currency.Acronym == exchangeData.FromAcronym);
        fromCurrency.Value -= exchangeData.FromValue;
        
        var toCurrency = bankAccount.Currencies.First(currency => currency.Acronym == exchangeData.ToAcronym);
        toCurrency.Value += exchangeData.ToValue;
        
        var transaction = new BankTransaction()
        {
            Company = $"Sold {fromCurrency.Acronym} for {toCurrency.Acronym}",
            CurrencyAcronym = fromCurrency.Acronym,
            Value = -exchangeData.FromValue,
            Address = "",
            Date = DateTime.UtcNow,
            Type = BankTransactionStatus.Approved,
        };
        bankAccount.BankTransactions.Add(transaction);
        await _context.SaveChangesAsync();
    }

    private BankAccount CreateDefaultBankAccount(int userAccountId)
    {
        return new BankAccount()
        {
            AccountId = userAccountId,
            Currencies = new HashSet<BankCurrency>()
            {
                new()
                {
                    Name = "United States Dollar",
                    Symbol = "$",
                    Acronym = "USD",
                    Country = "us",
                    Value = 0,
                },
                new()
                {
                    Name = "Euro",
                    Symbol = "€",
                    Acronym = "EUR",
                    Country = "eu",
                    Value = 0,
                },
                new()
                {
                    Name = "Hungarian Forint",
                    Symbol = "Ft",
                    Acronym = "HUF",
                    Country = "hu",
                    Value = 0,
                }
            }
        };
    }
}