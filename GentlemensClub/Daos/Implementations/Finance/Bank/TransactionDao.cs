using System.Collections;
using GentlemensClub.Models.Finance.Bank;
namespace GentlemensClub.Daos.Implementations;

public class TransactionDao : ITransactionDao
{
    public void Add(TransactionModel transaction)
    {
        var tId = 1;
        transaction.Id = tId;
    }

    public void Remove(int id)
    {
        throw new NotImplementedException();
    }

    public TransactionModel Get(int id)
    {
        throw new NotImplementedException();
    }
    
    public List<TransactionModel> GetAll(int bankAccountId)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<TransactionModel> GetAll()
    {
        throw new NotImplementedException();
    }
}