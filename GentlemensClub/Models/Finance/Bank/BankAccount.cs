using System.ComponentModel.DataAnnotations.Schema;

namespace GentlemensClub.Models.Finance.Bank;

public class BankAccount
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public int AccountId { get; set; }
    public List<Currency>? Currencies { get; set; }
    public List<TransactionModel>? TransactionModels { get; set; }
}