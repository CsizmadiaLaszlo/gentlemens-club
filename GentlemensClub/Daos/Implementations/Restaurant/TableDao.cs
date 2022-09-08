using GentlemensClub.Daos.Restaurant;
using GentlemensClub.Models.Restaurant.Table;

namespace GentlemensClub.Daos.Implementations.Restaurant;

public class TableDao : ITableDao
{

    private List<TableModel> tables;

    public TableDao()
    {
        tables = new List<TableModel>();
        FillTablesList();
    }

    public void Add(TableModel item)
    {
        throw new NotImplementedException();
    }

    public void Remove(int id)
    {
        throw new NotImplementedException();
    }

    public TableModel? Get(int id)
    {
        foreach (TableModel table in tables)
        {
            if (table.Id == id) return table;
        }
        return null;
    }

    public IEnumerable<TableModel> GetAll()
    {
        return tables;
    }

    private void FillTablesList()
    {
        const string chars = " A B C D E F G H I J K L M N O P Q R S T U V W X Y Z ";
        Random random = new Random(6969);
        for (int i = 0; i < 25; i++)
        {
            TableModel newTable = new TableModel();
            ReservationModel newReservation = new ReservationModel();
            newTable.Id = i + 1;
            newTable.Description = new string(Enumerable.Repeat(chars, 50)
                .Select(s => s[random.Next(s.Length)]).ToArray());
            newTable.SeatCount = random.Next(0, 6);
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