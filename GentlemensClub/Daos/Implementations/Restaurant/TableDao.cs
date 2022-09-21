using GentlemensClub.Daos.Restaurant;
using GentlemensClub.Models.Restaurant.Table;

namespace GentlemensClub.Daos.Implementations.Restaurant;

public class TableDao : ITableDao
{

    private List<Table> tables;

    public TableDao()
    {
        tables = new List<Table>();
        FillTablesList();
    }

    public void Add(Table item)
    {
        throw new NotImplementedException();
    }

    public void Remove(int id)
    {
        throw new NotImplementedException();
    }

    public Table? Get(int id)
    {
        foreach (Table table in tables)
        {
            if (table.Id == id) return table;
        }
        return null;
    }

    public IEnumerable<Table> GetAll()
    {
        return tables;
    }

    public Dictionary<int, Reservation> GetTableReservations()
    {
        var reservations = new Dictionary<int, Reservation>();

        foreach (Table table in tables)
        {
            reservations.Add(table.Id, table.Reservation);
        }

        return reservations;
    }

    private void FillTablesList()
    {
        const string chars = " A B C D E F G H I J K L M N O P Q R S T U V W X Y Z ";
        Random random = new Random(6969);
        for (int i = 0; i < 25; i++)
        {
            Table newTable = new Table();
            Reservation newReservation = new Reservation();
            newTable.Id = i + 1;
            newTable.Description = new string(Enumerable.Repeat(chars, 50)
                .Select(s => s[random.Next(s.Length)]).ToArray());
            newTable.SeatCount = random.Next(2, 6);
            if (random.Next(0, 100) > 50)
            {
                newReservation.Id = random.Next(0, 100);
                newReservation.ReservationStartDate = DateTime.Now;
                newTable.Reservation = newReservation;
            }
            tables.Add(newTable);
        }
    }
}