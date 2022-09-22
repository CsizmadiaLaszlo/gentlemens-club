using GentlemensClub.Data;
using GentlemensClub.Models.Restaurant.Table;
using GentlemensClub.Services.Interfaces.Restaurant.Table;
using Microsoft.EntityFrameworkCore;

namespace GentlemensClub.Services;

public class RestaurantService : IRestaurantService
{
    private readonly GentlemensClubContext _context;

    public RestaurantService(GentlemensClubContext context)
    {
        _context = context;
    }
    
    // TODO define docstring
    public async Task Add(RestaurantTable table)
    {
        throw new NotImplementedException();
    }

    // TODO define docstring
    public async Task Remove(int id)
    {
        throw new NotImplementedException();
    }

    /// <summary>
    /// Gets a RestaurantTable from DB by its id
    /// </summary>
    /// <param name="id"></param>
    /// <returns>RestaurantTable object with corresponding Reservation</returns>
    public async Task<RestaurantTable?> GetTableData(int id)
    {
        return await _context.
            RestaurantTables.
            Include(t => t.Reservation).
            FirstOrDefaultAsync(t => t.Id == id);
    }

    /// <summary>
    /// Gets all RestaurantTables from DB
    /// </summary>
    /// <returns>List of RestaurantTable objects with corresponding Reservations</returns>
    public async Task<IEnumerable<RestaurantTable>> GetAllTables()
    {
        return await _context.
            RestaurantTables.
            Include(t => t.Reservation).
            ToListAsync();
    }

}