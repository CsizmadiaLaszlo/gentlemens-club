using GentlemensClub.Models.Account;

namespace GentlemensClub.Daos;

public interface IAccountDao : IDao<Account>
{
    Account? GetByUsername(string name);
}