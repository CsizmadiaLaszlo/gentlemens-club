using GentlemensClub.Models.Finance.Bank;

namespace GentlemensClub.Services.Interfaces.Finance.Bank;

public interface IBankCurrencyService
{
    Task AddBankCurrency(int bankAccountId, BankCurrency bankCurrency);
    Task RemoveBankCurrency(int bankCurrencyId);
    Task UpdateBankCurrency(BankCurrency bankCurrency);
    Task<BankCurrency> GetBankCurrency(int bankCurrencyId);
    Task<BankCurrency> GetBankCurrency(int bankAccountId, string acronym);
    Task<HashSet<BankCurrency>> GetAllBankCurrencyByBankAccount(int bankAccountId);
}