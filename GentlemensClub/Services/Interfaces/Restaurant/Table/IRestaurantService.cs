using GentlemensClub.Models.Restaurant.Table;

namespace GentlemensClub.Services.Interfaces.Restaurant.Table;

public interface IRestaurantService : IReservationService
{
    Task Add(RestaurantTable table);
    Task Remove(int id);
    Task<RestaurantTable?> Get(int id);
    Task<IEnumerable<RestaurantTable>> GetAll();
    
    Task<Dictionary<int, Reservation?>> GetTableReservations();
}