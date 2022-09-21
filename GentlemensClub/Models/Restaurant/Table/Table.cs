namespace GentlemensClub.Models.Restaurant.Table;

public class Table
{
    public int Id { get; set; }
    public string Description { get; set; }
    public int SeatCount { get; set; }
    public Reservation? Reservation { get; set; }
}