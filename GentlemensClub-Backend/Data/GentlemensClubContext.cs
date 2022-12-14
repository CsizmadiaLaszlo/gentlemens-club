using GentlemensClub.Models.ContactPage;
using GentlemensClub.Models.Authentication;
using GentlemensClub.Models.Finance.Bank;
using GentlemensClub.Models.Restaurant.Menu;
using GentlemensClub.Models.Restaurant.Table;
using Microsoft.EntityFrameworkCore;

namespace GentlemensClub.Data;

public class GentlemensClubContext : DbContext
{
    public DbSet<Account> Accounts { get; set; }
    public DbSet<BankAccount> BankAccounts { get; set; }
    public DbSet<BankCurrency> BankCurrencies { get; set; }
    public DbSet<BankTransaction> BankTransactions { get; set; }
    public DbSet<RestaurantTable> RestaurantTables { get; set; }
    public DbSet<Reservation> Reservations { get; set; }
    public DbSet<ContactForm> ContactForms { get; set; }
    public DbSet<MenuItem> MenuItems { get; set; }
    public DbSet<BankStock> BankStocks { get; set; }

    public GentlemensClubContext(DbContextOptions<GentlemensClubContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // User account
        modelBuilder.Entity<Account>().ToTable("account");
        // User bank account
        modelBuilder.Entity<BankAccount>().ToTable("bank_account");
        modelBuilder.Entity<BankCurrency>().ToTable("bank_currency");
        modelBuilder.Entity<BankTransaction>().ToTable("bank_transaction");
        modelBuilder.Entity<BankStock>().ToTable("bank_stock");
        // Restaurant
        modelBuilder.Entity<RestaurantTable>().ToTable("restaurant_table");
        modelBuilder.Entity<Reservation>().ToTable("reservation");
        modelBuilder.Entity<ContactForm>().ToTable("contact_form");
        modelBuilder.Entity<MenuItem>().ToTable("menu_item");
        // stb
    }
}