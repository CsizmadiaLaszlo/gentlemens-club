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

    public async Task AddStock(int bankAccountId, string name, string symbol)
    {
        
        var account = await _context.BankAccounts.FirstOrDefaultAsync(s => s.AccountId == bankAccountId);
        var stocks = account?.Stocks;
        if (stocks != null)
        {
            BankStock newStock = new BankStock()
            {
                Name = name,
                Symbol = symbol,
                Value = 0
            };
            stocks.Add(newStock);
            await _context.BankStocks.AddAsync(stocks.Last());
            await _context.SaveChangesAsync();
        }
    }

    public async Task AddValue(int bankAccountId, string name, string symbol, double value)
    {
        var stockId = await FindStockId(bankAccountId, symbol);
        if (stockId == null) await AddStock(bankAccountId, name, symbol);
        stockId = await FindStockId(bankAccountId, symbol);
        var stock = await _context.BankStocks.FirstOrDefaultAsync(s => s.Id == stockId);
        if (stock != null)
        {
            stock.Value += value;
            _context.BankStocks.Update(stock);
            await _context.SaveChangesAsync();
        }
    }

}

