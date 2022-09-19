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
    }
}