using GentlemensClub.Daos;
using GentlemensClub.Models.Restaurant.Table;

public interface ITableDao : IDao<Table>
{

    public Dictionary<int, Reservation> GetTableReservations();

}