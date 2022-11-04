using GentlemensClub.Models.Finance.Bank;

namespace GentlemensClub.Services.Interfaces.Finance.Stock;

public interface IStockDatabaseService
{
    Task<int?> FindStockId(int bankAccountId, string symbol);
    Task AddStock(int bankAccountId, string name, string symbol);
    Task AddValue(int bankAccountId, string name, string symbol, double value);
    Task ReduceValue(int bankAccountId, string symbol, double value);
    Task<HashSet<BankStock>> GetAllStocks(int bankAccountId);
    Task<double> GetStockValue(int bankAccountId, string symbol);
}