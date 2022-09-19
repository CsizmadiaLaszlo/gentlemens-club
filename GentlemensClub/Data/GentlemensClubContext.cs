using GentlemensClub.Models.Account;
using GentlemensClub.Models.Finance.Bank;
using Microsoft.EntityFrameworkCore;

namespace GentlemensClub.Data;

public class GentlemensClubContext : DbContext
{
    public DbSet<Account> Accounts { get; set; }
    public DbSet<BankAccount> BankAccounts { get; set; }

    public GentlemensClubContext(DbContextOptions<GentlemensClubContext> options) : base(options)
    {
        
    }
    
}