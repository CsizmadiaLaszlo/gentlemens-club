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
}

