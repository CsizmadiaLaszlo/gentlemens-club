using GentlemensClub.Models.Finance.Bank;

namespace GentlemensClub.Services.Interfaces.Finance.Bank;

public interface IBankTransactionService
{
    Task AddBankTransaction(int bankAccountId, BankTransaction bankTransaction);
    Task RemoveBankTransaction(int bankCurrencyId);
    Task UpdateBankTransaction(BankTransaction bankTransaction);
    Task<BankCurrency> GetBankTransaction(int bankCurrencyId);
    Task<HashSet<BankCurrency>> GetAllBankTransactionByBankAccount(int bankAccountId);
}