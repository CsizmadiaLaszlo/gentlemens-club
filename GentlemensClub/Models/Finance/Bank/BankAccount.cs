using GentlemensClub.Models.Account;
namespace GentlemensClub.Models.Finance.Bank;

public class BankAccount
{
    public int Id { get; set; }
    public int AccountId { get; set; }
    public HashSet<Currency>? Currencies { get; set; }
    public HashSet<TransactionModel>? Transactions { get; set; }
}