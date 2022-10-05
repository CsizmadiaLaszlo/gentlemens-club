using GentlemensClub.Data;
using GentlemensClub.Models.Restaurant.Menu;
using GentlemensClub.Models.Restaurant.Table;
using GentlemensClub.Services.Interfaces.Restaurant;
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

    /// <summary>
    /// Gets all TableReservations from DB connected to RestaurantTables id
    /// </summary>
    /// <returns>Dictionary of RestaurantTable Id with corresponding Reservation objects</returns>
    public async Task<Dictionary<int, Reservation?>> GetTableReservations()
    {
        var tables = await GetAllTables();
        
        var reservations = new Dictionary<int, Reservation?>();

        foreach (RestaurantTable table in tables)
        {
            reservations.Add(table.Id, table.Reservation);
        }

        return reservations;
    }

    public async Task<IEnumerable<MenuItem>> GetAllMenuItems()
    {
        return await _context.MenuItems.ToListAsync();
    }

    public async Task<IEnumerable<MenuItem>> GetMenuItemsInCategory(MenuSearchCategory category)
    {
        if (!category.SpecialFoodCategory.Equals(null))
        {
            return await _context.MenuItems.
                Where(item => item.SpecialCategories.Equals(category.SpecialFoodCategory)).
                Where(item => item.Category.Equals(category.MenuItemCategory)).
                ToListAsync();
        }
        else
        {
            return await _context.MenuItems.
                Where(item => item.Category.Equals(category.MenuItemCategory)).
                ToListAsync();
        }
    }

    public async Task<IEnumerable<MenuItem>> GetMenuItemsInSubCategory(MenuSearchCategory category)
    {
        if (category.SpecialFoodCategory.Equals(null))
        {
            return await _context.MenuItems.
                Where(item => item.SubCategory.Equals(category.MenuItemSubCategory)).
                ToListAsync();
        }
        else
        {
            return await _context.MenuItems.
                Where(item => item.SpecialCategories.Equals(category.SpecialFoodCategory)).
                Where(item => item.SubCategory.Equals(category.MenuItemSubCategory)).
                ToListAsync();
        }
    }
}