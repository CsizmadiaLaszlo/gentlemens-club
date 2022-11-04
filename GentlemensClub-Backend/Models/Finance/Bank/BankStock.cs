using System.ComponentModel.DataAnnotations.Schema;

namespace GentlemensClub.Models.Finance.Bank;

public class BankStock
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Symbol { get; set; }
    public double Value { get; set; }
}

