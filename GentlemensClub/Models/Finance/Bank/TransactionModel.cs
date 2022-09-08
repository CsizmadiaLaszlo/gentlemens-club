namespace GentlemensClub.Models.Finance.Bank;

public struct TransactionModel
{
    public int Id { get; set; }
    public int BankAccountId { get; set; }
    public string Company { get; set; }
    public string Address { get; set; }
    public string CurrencyAcronym { get; set; }
    public double Value { get; set; }
    public DateTime Date { get; set; }
    public TransactionStatus Type { get; set; }
}