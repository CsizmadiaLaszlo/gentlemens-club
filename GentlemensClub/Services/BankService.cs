using GentlemensClub.Daos.Implementations;
using GentlemensClub.Data;
using GentlemensClub.Models.Account;
using GentlemensClub.Models.Finance.Bank;
using GentlemensClub.Services.Interfaces.Finance.Bank;
using Microsoft.EntityFrameworkCore;

namespace GentlemensClub.Services;

public class BankAccountService : IBankService
{
    private readonly GentlemensClubContext _context;

    public BankAccountService(GentlemensClubContext context)
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

    public Task<BankCurrency> GetBankCurrency(int bankCurrencyId)
    {
        throw new NotImplementedException();
    }

    public Task<HashSet<BankCurrency>> GetAllBankCurrencyByBankAccount(int bankAccountId)
    {
        throw new NotImplementedException();
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

    public Task<BankCurrency> GetBankTransaction(int bankCurrencyId)
    {
        throw new NotImplementedException();
    }

    public Task<HashSet<BankCurrency>> GetAllBankTransactionByBankAccount(int bankAccountId)
    {
        throw new NotImplementedException();
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