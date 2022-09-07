using System.Collections;
using GentlemensClub.Models.Finance.Bank;

namespace GentlemensClub.Daos.Implementations;

public class CurrencyDao : ICurrencyDao
{
    public void Add(Currency currency)
    {
        var currencyId = 1;
        currency.Id = currencyId;
    }

    public void Remove(int id)
    {
    }

    public List<Currency> GetAll(int bankAccountId)
    {
        throw new NotImplementedException();
    }

    public Currency Get(int id)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<Currency> GetAll()
    {
        throw new NotImplementedException();
    }
}