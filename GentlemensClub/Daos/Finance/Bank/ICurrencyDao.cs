using GentlemensClub.Models.Finance;
using GentlemensClub.Models.Finance.Bank;

namespace GentlemensClub.Daos.Implementations;

public interface ICurrencyDao : IDao<Currency>
{
    List<Currency> GetAll(int bankAccountId);
}