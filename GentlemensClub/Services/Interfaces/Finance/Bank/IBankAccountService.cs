using GentlemensClub.Models.Account;
using GentlemensClub.Models.Finance.Bank;

namespace GentlemensClub.Services.Interfaces.Finance.Bank;

public interface IBankAccountService
{
    Task AddBankAccount(Account account);
    Task<BankAccount> GetBankAccount(int id);
    Task DeleteBankAccount(int id);
    Task UpdateBankAccount(BankAccount bankAccount);
}