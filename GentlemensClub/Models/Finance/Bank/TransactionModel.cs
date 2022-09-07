namespace GentlemensClub.Models.Finance.Bank;

public struct TransactionModel
{
    public int Id { get; set; }
    public int BankAccountId { get; set; }
    public string Company { get; set; }
    public Currency Currency { get; set; }
    public double Value { get; set; }
    public DateTime Date { get; set; }
    public TransactionStatus Type { get; set; }
}