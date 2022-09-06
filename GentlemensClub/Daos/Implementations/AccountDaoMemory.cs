using GentlemensClub.Models.Account;

namespace GentlemensClub.Daos.Implementations;

public class AccountDaoMemory : IAccountDao
{
    private List<Account> data = new List<Account>();
    private static AccountDaoMemory? _instance = null;

    private AccountDaoMemory()
    {
        //TODO remove test data
        Add(new Account()
        {
            Username = "test",
            PasswordHash = "123",
            Email = "test@test.hu"
        });
    }

    public static AccountDaoMemory GetInstance()
    {
        if (_instance == null)
        {
            _instance = new AccountDaoMemory();
        }

        return _instance;
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