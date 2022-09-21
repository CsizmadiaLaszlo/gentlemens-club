using System.Collections;

namespace GentlemensClub.Services.Interfaces.Finance.Stock;

public interface IStockApiService
{
    Task<IEnumerable> Stock(int? page = 1);
    Task<IEnumerable> StockInfo(string? symbol);
    Task<IEnumerable> WeeklyStatistics(string? symbol);
    Task<IEnumerable> YearlyStatistics(string? symbol);
    Task<int> MaxPage();
}