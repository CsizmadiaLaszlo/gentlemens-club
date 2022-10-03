using System.ComponentModel.DataAnnotations.Schema;

namespace GentlemensClub.Models.Finance.Bank;

public class BankCurrency
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Symbol { get; set; }
    public string Acronym { get; set; }
    public string Country { get; set; }
    public double Value { get; set; }
}