namespace GentlemensClub.Models.Finance.Bank;

public class ExchangeDto
{
    public string? FromAcronym { get; set; }
    public double FromValue { get; set; }
    public string? ToAcronym { get; set; }
    public double ToValue { get; set; }
}