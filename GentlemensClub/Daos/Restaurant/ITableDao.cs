using GentlemensClub.Daos;
using GentlemensClub.Models.Restaurant.Table;

public interface ITableDao : IDao<RestaurantTable>
{

    public Dictionary<int, Reservation> GetTableReservations();

}