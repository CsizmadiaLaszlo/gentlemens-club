using System.ComponentModel.DataAnnotations.Schema;

namespace GentlemensClub.Models.Finance.Bank;

public class BankAccount
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public int AccountId { get; set; }
    public HashSet<BankCurrency> Currencies { get; set; } = new();
    public HashSet<BankTransaction> BankTransactions { get; set; } = new();
    public HashSet<BankStock> Stocks { get; set; } = new();
}