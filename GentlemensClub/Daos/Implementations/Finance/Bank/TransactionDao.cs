using System.Collections;
using GentlemensClub.Models.Finance.Bank;

namespace GentlemensClub.Daos.Implementations;

public class TransactionDao : ITransactionDao
{
    public List<TransactionModel> Transactions = new List<TransactionModel>()
    {
        new()
        {
            Id = 1,
            BankAccountId = 1,
            Company = "iTunes",
            Address = "Apple One Apple Park Way Cupertino, CA 95014",
            CurrencyAcronym = "USD",
            Value = -500,
            Date = DateTime.ParseExact("2022-09-07 10:40:52", "yyyy-MM-dd HH:mm:ss",
                System.Globalization.CultureInfo.InvariantCulture)
        },
        new()
        {
            Id = 1,
            BankAccountId = 1,
            Company = "NetPincer",
            Address = "6723, Szeged Etetelka sor 4",
            CurrencyAcronym = "HUF",
            Value = -4699,
            Date = DateTime.ParseExact("2022-09-07 17:31:40", "yyyy-MM-dd HH:mm:ss",
                System.Globalization.CultureInfo.InvariantCulture)
        },
        new()
        {
            Id = 1,
            BankAccountId = 1,
            Company = "Premium plan fee",
            Address = "2880 Broadway, New York",
            CurrencyAcronym = "USD",
            Value = -4999,
            Date = DateTime.ParseExact("2022-09-06 12:39:41", "yyyy-MM-dd HH:mm:ss",
                System.Globalization.CultureInfo.InvariantCulture)
        },
    };

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
        return Transactions;
    }

    public IEnumerable<TransactionModel> GetAll()
    {
        throw new NotImplementedException();
    }
}