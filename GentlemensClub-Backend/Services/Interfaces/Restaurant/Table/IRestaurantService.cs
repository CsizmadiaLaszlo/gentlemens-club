using GentlemensClub.Models.Restaurant.Table;

namespace GentlemensClub.Services.Interfaces.Restaurant.Table;

public interface IRestaurantService : IReservationService
{
    Task Add(RestaurantTable table);
    Task Remove(int id);
    Task<RestaurantTable?> GetTableData(int id);
    Task<IEnumerable<RestaurantTable>> GetAllTables();
    
    Task<Dictionary<int, Reservation?>> GetTableReservations();
}