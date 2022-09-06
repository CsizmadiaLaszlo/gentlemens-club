namespace GentlemensClub.Models.Restaurant.Table;

public class TableModel
{
    public int Id { get; set; }
    public string Description { get; set; }
    public int SeatCount { get; set; }
    public ReservationModel? Reservation { get; set; }
}