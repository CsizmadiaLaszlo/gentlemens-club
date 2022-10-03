using GentlemensClub.Models.Finance.Bank;

namespace GentlemensClub.Services.Interfaces.Finance.Bank;

public interface IBankTransactionService
{
    Task AddBankTransaction(int bankAccountId, BankTransaction bankTransaction);
    Task RemoveBankTransaction(int bankTransactionId);
    Task UpdateBankTransaction(BankTransaction bankTransaction);
    Task<BankTransaction> GetBankTransaction(int bankAccountId, int bankTransactionId);
    Task<HashSet<BankTransaction>> GetAllBankTransactionByBankAccount(int bankAccountId);
}