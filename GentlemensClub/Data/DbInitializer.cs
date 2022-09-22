using GentlemensClub.Models.Account;
using GentlemensClub.Models.Finance.Bank;
using GentlemensClub.Models.Restaurant.Table;

namespace GentlemensClub.Data;

public class DbInitializer
{
    public static void Initialize(GentlemensClubContext context)
    {
        // Create DB if not exist
        context.Database.EnsureCreated();

        // Look for tables, if any, no action
        if (context.Accounts.Any() ||
            context.BankAccounts.Any() ||
            context.BankCurrencies.Any() ||
            context.BankTransactions.Any() ||
            context.RestaurantTables.Any() ||
            context.Reservations.Any()
           )
        {
            return;
        }

        // Create accounts
        Account account = new Account
        {
            Username = "test",
            Email = "test@test.hu",
            PasswordHash = "AQAAAAEAACcQAAAAEC6FNjtlFym5GluVkzBpNOhFI4scoKFgSicIRltejVDOfKQLIa0pDgvHHgN1wHi9Uw=="
        };

        var accountEntity = context.Accounts.Add(account);
        context.SaveChanges();

        // Create BankAccount
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
        
        // Create Tables at Restaurant
        List<RestaurantTable> tables = CreateTablesList();
        context.AddRange(tables);
        context.SaveChanges();
    }
    
    private static List<RestaurantTable> CreateTablesList()
    {
        List<RestaurantTable> tables = new();
        
        const string chars = " A B C D E F G H I J K L M N O P Q R S T U V W X Y Z ";
        Random random = new Random(6969);
        for (int i = 0; i < 25; i++)
        {
            RestaurantTable newRestaurantTable = new RestaurantTable();
            Reservation newReservation = new Reservation();
            newRestaurantTable.Id = i + 1;
            newRestaurantTable.Description = new string(Enumerable.Repeat(chars, 50)
                .Select(s => s[random.Next(s.Length)]).ToArray());
            newRestaurantTable.SeatCount = random.Next(2, 6);
            if (random.Next(0, 100) > 50)
            {
                newReservation.Id = random.Next(0, 100);
                newReservation.ReservationStartDate = DateTime.Now;
                newRestaurantTable.Reservation = newReservation;
            }
            tables.Add(newRestaurantTable);
        }

        return tables;
    }
}