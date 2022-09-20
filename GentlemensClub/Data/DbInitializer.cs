using GentlemensClub.Models.Account;
using GentlemensClub.Models.Finance.Bank;

namespace GentlemensClub.Data;

public class DbInitializer
{
    public static void Initialize(GentlemensClubContext context)
    {
        context.Database.EnsureCreated();

        if (context.Accounts.Any() ||
            context.BankAccounts.Any() || context.BankCurrencies.Any() || context.BankTransactions.Any()
           )
        {
            return;
        }

        Account account = new Account
        {
            Username = "test",
            Email = "test@test.hu",
            PasswordHash = "AQAAAAEAACcQAAAAEC6FNjtlFym5GluVkzBpNOhFI4scoKFgSicIRltejVDOfKQLIa0pDgvHHgN1wHi9Uw=="
        };

        var accountEntity = context.Accounts.Add(account);
        context.SaveChanges();

        var bankAccount = new BankAccount()
        {
            AccountId = accountEntity.Entity.Id,
            Currencies = new HashSet<BankCurrency>()
            {
                new()
                {
                    Name = "United States Dollar",
                    Symbol = "$",
                    Acronym = "USD",
                    Country = "us",
                    Value = 57003.84,
                },
                new()
                {
                    Name = "Euro",
                    Symbol = "€",
                    Acronym = "EUR",
                    Country = "eu",
                    Value = 163003.67,
                },
                new()
                {
                    Name = "Hungarian Forint",
                    Symbol = "Ft",
                    Acronym = "HUF",
                    Country = "hu",
                    Value = 67500.32,
                }
            },
            BankTransactions = new HashSet<BankTransaction>()
            {
                new()
                {
                    Company = "iTunes",
                    Address = "Apple One Apple Park Way Cupertino, CA 95014",
                    CurrencyAcronym = "USD",
                    Value = -500,
                    Date = DateTime.UtcNow
                },
                new()
                {
                    Company = "NetPincer",
                    Address = "6723, Szeged Etetelka sor 4",
                    CurrencyAcronym = "HUF",
                    Value = -4699,
                    Date = DateTime.UtcNow
                },
                new()
                {
                    Company = "Premium plan fee",
                    Address = "2880 Broadway, New York",
                    CurrencyAcronym = "USD",
                    Value = -4999,
                    Date = DateTime.UtcNow
                },
            }
        };
        context.BankAccounts.Add(bankAccount);
        context.SaveChanges();
    }
}