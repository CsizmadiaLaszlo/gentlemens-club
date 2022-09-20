﻿using GentlemensClub.Models.Account;
using System.ComponentModel.DataAnnotations.Schema;

namespace GentlemensClub.Models.Finance.Bank;

public class BankAccount
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public int AccountId { get; set; }
    public Account.Account Account { get; set; }
    public HashSet<BankCurrency> Currencies { get; set; } = new();
    public HashSet<BankTransaction> BankTransactions { get; set; } = new();
}