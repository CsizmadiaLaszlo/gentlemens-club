using GentlemensClub.Models.Account;

namespace GentlemensClub.Daos.Implementations;

public class AccountDaoMemory : IAccountDao
{
    private List<Account> data = new List<Account>();
    private static AccountDaoMemory instance = null;

    private AccountDaoMemory()
    {
    }

    public static AccountDaoMemory GetInstance()
    {
        if (instance == null)
        {
            instance = new AccountDaoMemory();
        }

        return instance;
    }

    public void Add(Account item)
    {
        item.Id = data.Count + 1;
        data.Add(item);
    }

    public void Remove(int id)
    {
        data.Remove(this.Get(id));
    }

    public Account? Get(int id)
    {
        return data.Find(x => x.Id == id);
    }

    public Account? GetByUsername(string username)
    {
        return data.Find(x => x.Username == username);
    }

    public IEnumerable<Account> GetAll()
    {
        return data;
    }
}