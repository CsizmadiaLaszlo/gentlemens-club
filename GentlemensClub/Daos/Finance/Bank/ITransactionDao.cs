using GentlemensClub.Models.Finance;
using GentlemensClub.Models.Finance.Bank;

namespace GentlemensClub.Daos.Implementations;

public interface ITransactionDao : IDao<TransactionModel>
{
    List<TransactionModel> GetAll(int bankAccountId);
}