using GentlemensClub.Models.Authentication;
using GentlemensClub.Models.Finance.Bank;
using GentlemensClub.Models.Restaurant.Menu;
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
            context.Reservations.Any() ||
            context.ContactForms.Any()
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

        // Create menu items for the Restaurant menu
        context.MenuItems.AddRange(CreateMenuItems());
        context.SaveChanges();
    }

    private static List<MenuItem> CreateMenuItems()
    {
        List<MenuItem> items = new List<MenuItem>();

        List<MenuItem> dishes = new List<MenuItem>
        {
            new MenuItem
            {
                Name = "Steak",
                Image = "steak",
                Category = MenuItemCategory.Dishes,
                Ingredients = new List<string>
                {
                    "Steak",
                    "More Steak"
                },
                isChefFavorite = false
            },
            new MenuItem
            {
                Name = "Salmon",
                Image = "salmon",
                Category = MenuItemCategory.Dishes,
                Ingredients = new List<string>
                {
                    "Some fish",
                    "Maybe a broken fishing rod"
                },
                SpecialCategories = new List<SpecialFoodCategory>
                {
                    SpecialFoodCategory.LowCalorie,
                    SpecialFoodCategory.LactoseFree
                },
                isChefFavorite = true
            },
            new MenuItem
            {
                Name = "Broccoli and Chicken Stir-Fry",
                Image = "broccoli-and-chicken-stir-fry",
                Category = MenuItemCategory.Dishes,
                Ingredients = new List<string>
                {
                    "Broccoli",
                    "Chicken",
                    "Sauce"
                },
                SpecialCategories = new List<SpecialFoodCategory>
                {
                    SpecialFoodCategory.LowCalorie
                },
                isChefFavorite = false
            },
            new MenuItem
            {
                Name = "Pasta Salad",
                Image = "pasta-salad",
                Category = MenuItemCategory.Dishes,
                Ingredients = new List<string>
                {
                    "Pasta",
                    "Salad",
                    "Magical Sauce"
                },
                SpecialCategories = new List<SpecialFoodCategory>
                {
                    SpecialFoodCategory.LowCalorie,
                    SpecialFoodCategory.Vegan
                },
                isChefFavorite = false
            },
            new MenuItem
            {
                Name = "Ginger Veggie Stir-Fry ",
                Image = "ginger-veggie-stir-fry",
                Category = MenuItemCategory.Dishes,
                Ingredients = new List<string>
                {
                    "Vegetables"
                },
                SpecialCategories = new List<SpecialFoodCategory>
                {
                    SpecialFoodCategory.LowCalorie,
                    SpecialFoodCategory.LactoseFree,
                    SpecialFoodCategory.Vegan
                },
                isChefFavorite = false
            }
        };

        List<MenuItem> drinks = new List<MenuItem>
        {
            new MenuItem
            {
                Name = "Coca Cola",
                Image = "cocacola",
                Category = MenuItemCategory.Drinks,
                Ingredients = new List<string>
                {
                    "Coca Cola"
                },
                SpecialCategories = new List<SpecialFoodCategory>
                {
                    SpecialFoodCategory.Vegan,
                    SpecialFoodCategory.LactoseFree
                },
                isChefFavorite = false
            },
            new MenuItem
            {
                Name = "Pepsi",
                Image = "pepsi",
                Category = MenuItemCategory.Drinks,
                Ingredients = new List<string>
                {
                    "Pepsi"
                },
                SpecialCategories = new List<SpecialFoodCategory>
                {
                    SpecialFoodCategory.Vegan,
                    SpecialFoodCategory.LactoseFree
                },
                isChefFavorite = true
            },
            new MenuItem
            {
                Name = "Pepsi Zero",
                Image = "pepsi-zero",
                Category = MenuItemCategory.Drinks,
                Ingredients = new List<string>
                {
                    "Pepsi Zero"
                },
                SpecialCategories = new List<SpecialFoodCategory>
                {
                    SpecialFoodCategory.LowCalorie,
                    SpecialFoodCategory.LactoseFree,
                    SpecialFoodCategory.Vegan
                },
                isChefFavorite = false
            },
            new MenuItem
            {
                Name = "Ice Tea",
                Image = "icetea",
                Category = MenuItemCategory.Drinks,
                Ingredients = new List<string>
                {
                    "Ice",
                    "Tea"
                },
                SpecialCategories = new List<SpecialFoodCategory>
                {
                    SpecialFoodCategory.LowCalorie,
                    SpecialFoodCategory.LactoseFree,
                    SpecialFoodCategory.Vegan
                },
                isChefFavorite = false
            },
            new MenuItem
            {
                Name = "Whiskey",
                Image = "whiskey",
                Category = MenuItemCategory.Drinks,
                Ingredients = new List<string>
                {
                    "Whis",
                    "Key"
                },
                SpecialCategories = new List<SpecialFoodCategory>
                {
                    SpecialFoodCategory.Vegan,
                    SpecialFoodCategory.LactoseFree
                },
                isChefFavorite = true
            },
            new MenuItem
            {
                Name = "Cocktail",
                Image = "cocktail",
                Category = MenuItemCategory.Drinks,
                Ingredients = new List<string>
                {
                    "Alcoholic juice",
                    "Ice",
                    "Cock",
                    "Tail"
                },
                SpecialCategories = new List<SpecialFoodCategory>
                {
                    SpecialFoodCategory.Vegan,
                    SpecialFoodCategory.LactoseFree
                },
                isChefFavorite = false
            },
            new MenuItem
            {
                Name = "Mojito",
                Image = "mojito",
                Category = MenuItemCategory.Drinks,
                Ingredients = new List<string>
                {
                    "Lime",
                    "Water",
                    "Crushed Ice",
                    "Sugar"
                },
                SpecialCategories = new List<SpecialFoodCategory>
                {
                    SpecialFoodCategory.Vegan,
                    SpecialFoodCategory.LactoseFree
                },
                isChefFavorite = true
            },
        };

        List<MenuItem> desserts = new List<MenuItem>
        {
            new MenuItem
            {
                Name = "Macaron",
                Image = "macaron",
                Category = MenuItemCategory.Desserts,
                Ingredients = new List<string>
                {
                    "Sugar",
                    "Chocolate cream"
                },
                SpecialCategories = new List<SpecialFoodCategory>
                {
                    SpecialFoodCategory.Vegan,
                    SpecialFoodCategory.LactoseFree
                },
                isChefFavorite = true
            }
        };

        items.AddRange(dishes);
        items.AddRange(drinks);
        items.AddRange(desserts);

        return items;

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
            newRestaurantTable.Description = new string(Enumerable.Repeat(chars, 50)
                .Select(s => s[random.Next(s.Length)]).ToArray());
            newRestaurantTable.SeatCount = random.Next(2, 6);
            if (random.Next(0, 100) > 50)
            {
                newReservation.ReservationStartDate = DateTime.UtcNow;
                newRestaurantTable.Reservation = newReservation;
            }
            tables.Add(newRestaurantTable);
        }

        return tables;
    }
}