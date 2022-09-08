namespace GentlemensClub.Models.Finance.Bank;

public struct Currency
{
    public int Id { get; set; }
    public int BankAccountId { get; set; }
    public string Name { get; set; }
    public string Symbol { get; set; }
    public string Acronym { get; set; }
    public string Country { get; set; }
    public double Value { get; set; }
}