using System.Collections;
using GentlemensClub.Models.Finance.Bank;

namespace GentlemensClub.Daos.Implementations;

public class CurrencyDao : ICurrencyDao
{
    public List<Currency> DefaultCurrencies = new List<Currency>()
    {
        new()
        {
            Id = 1,
            BankAccountId = 1,
            Name = "United States Dollar",
            Symbol = "$",
            Acronym = "USD",
            Country = "us",
            Value = 57003.84,
        },
        new()
        {
            Id = 1,
            BankAccountId = 1,
            Name = "Euro",
            Symbol = "€",
            Acronym = "EUR",
            Country = "eu",
            Value = 163003.67,
        },
        new()
        {
            Id = 1,
            BankAccountId = 1,
            Name = "Hungarian Forint",
            Symbol = "Ft",
            Acronym = "HUF",
            Country = "hu",
            Value = 67500.32,
        }
    };
    
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
        return DefaultCurrencies;
    }

    public Currency Get(string acronym)
    {
        return DefaultCurrencies.First(currency => currency.Acronym == acronym);
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