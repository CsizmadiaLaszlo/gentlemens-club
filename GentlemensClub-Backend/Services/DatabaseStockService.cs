using GentlemensClub.Data;
using GentlemensClub.Models.Finance.Bank;
using GentlemensClub.Services.Interfaces.Finance.Stock;
using Microsoft.EntityFrameworkCore;

namespace GentlemensClub.Services;

public class DatabaseStockService : IStockDatabaseService
{
    private readonly GentlemensClubContext _context;

    public DatabaseStockService(GentlemensClubContext context)
    {
        _context = context;
    }

    public async Task<int?> FindStockId(int bankAccountId, string symbol)
    {
        var account = await _context.BankAccounts
            .Include(a => a.Stocks)
            .FirstOrDefaultAsync(a => a.AccountId == bankAccountId);
        var stock = account?.Stocks.FirstOrDefault(s => s.Symbol == symbol);
        return stock?.Id;
    }

}

