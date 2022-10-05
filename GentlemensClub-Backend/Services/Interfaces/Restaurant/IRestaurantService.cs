using GentlemensClub.Models.Restaurant.Menu;
using GentlemensClub.Models.Restaurant.Table;
using GentlemensClub.Services.Interfaces.Restaurant.Table;

namespace GentlemensClub.Services.Interfaces.Restaurant;

public interface IRestaurantService : IReservationService
{
    Task Add(RestaurantTable table);
    Task Remove(int id);
    Task<RestaurantTable?> GetTableData(int id);
    Task<IEnumerable<RestaurantTable>> GetAllTables();
    Task<Dictionary<int, Reservation?>> GetTableReservations();
    Task<IEnumerable<MenuItem>> GetAllMenuItems();
    Task<IEnumerable<MenuItem>> GetMenuItemsInCategory(MenuSearchCategory category);
    Task<IEnumerable<MenuItem>> GetMenuItemsInSubCategory(MenuSearchCategory category);
}