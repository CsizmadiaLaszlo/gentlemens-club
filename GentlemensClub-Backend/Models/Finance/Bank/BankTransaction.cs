using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace GentlemensClub.Models.Finance.Bank;

public class BankTransaction
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Company { get; set; }
    public string Address { get; set; }
    public string CurrencyAcronym { get; set; }
    public double Value { get; set; }
    public DateTime Date { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public BankTransactionStatus Type { get; set; }
}