using GentlemensClub.Models.Account;

namespace GentlemensClub.Data;

public class DbInitializer
{
    public static void Initialize(GentlemensClubContext context)
    {
        context.Database.EnsureCreated();

        if (context.Accounts.Any())
        {
            return;
        }

        Account account = new Account {Username = "Johnny Test", Email = "test@test.hu", PasswordHash = "AQAAAAEAACcQAAAAEC6FNjtlFym5GluVkzBpNOhFI4scoKFgSicIRltejVDOfKQLIa0pDgvHHgN1wHi9Uw=="};

        context.Accounts.Add(account);

        context.SaveChanges();
    }
}