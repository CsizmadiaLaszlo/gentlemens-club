using System.Collections;
using GentlemensClub.Models.Finance.Bank;
namespace GentlemensClub.Daos.Implementations;

public class BankAccountDao : IBankAccountDao
{
    public void Add(BankAccount bankAccount)
    {
        var idFromSqlReturn = 1;
        bankAccount.Id = idFromSqlReturn;
    }

    public void Remove(int id)
    {
        throw new NotImplementedException();
    }

    public BankAccount? Get(int id)
    {
        // Mock data
        return new BankAccount()
        {
            Id = 1,
            AccountId = 1,
        };
    }

    public IEnumerable<BankAccount> GetAll()
    {
        throw new NotImplementedException();
    }
}